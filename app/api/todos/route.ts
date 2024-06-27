import { NextResponse } from 'next/server';
import notion from '@/lib/notion';

export async function GET(req: Request, res: Response) {
    try {
        const tables = await notion.databases.query({
            database_id: process.env.NOTION_DATABASE_ID!, sorts: [
                {
                    timestamp: 'created_time',
                    direction: 'ascending'
                }
            ]
        })
        const todos = tables.results.map((result: any) => {
            return {
                pageId: result.id,
                title: result.properties.Title.title[0].plain_text,
                description: result.properties.Description.rich_text[0].plain_text,
                status: result.properties.Status.multi_select[0].name
            }
        })
        return NextResponse.json({ todos });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request, res: Response) {
    try {
        const { title, description, status } = await req.json();
        const newTodo = {
            parent: { database_id: process.env.NOTION_DATABASE_ID! },
            properties: {
                Title: {
                    title: [{ text: { content: title } }]
                },
                Description: {
                    rich_text: [{ text: { content: description } }]
                },
                Status: {
                    multi_select: [{ name: status }]
                }
            }
        }
        const response = await notion.pages.create(newTodo)
        return NextResponse.json({ message: 'Todo created successfully', status: 201 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req: Request, res: Response) {
    try {
        const {pageId, title, description, status } = await req.json();
        const updatedTodo = {
            page_id: pageId,
            properties: {
                Title: {
                    title: [{ text: { content: title } }]
                },
                Description: {
                    rich_text: [{ text: { content: description } }]
                },
                Status: {
                    multi_select: [{ name: status }]
                }
            }
        }
        const response = await notion.pages.update(updatedTodo)
        return NextResponse.json({ message: 'Todo updated successfully', status: 201 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request, res: Response) {
    try {
        const { pageId } = await req.json()
        const response = await notion.pages.update({
            page_id: pageId,
            archived: true
        })
        return NextResponse.json({ message: 'Todo deleted successfully', status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}