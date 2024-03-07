import {createInterface} from 'readline';
import {promises as fsPromises} from 'fs';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

function promptUser(question: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}

async function generateMarkdown(): Promise<void> {
    const title = await promptUser('Enter document title: ') || 'Default Title';
    const img = await promptUser('Enter image URL or leave blank: ') || '';
    const date = await promptUser('Enter date (e.g., 2024-03-06): ') || getCurrentDate();
    const tags = (await promptUser('Enter tags (comma-separated): ') || '').split(',').map(tag => tag.trim());
    const describe = await promptUser('Enter document description: ') || 'Document description goes here';

    const markdownContent = `---
title: ${title}
img: ${img}
date: ${date}
tags: [${tags}]
describe: ${describe}
---`;

    const fileName = `/${title.toLowerCase().replace(/\s/g, '-')}.md`;
    const filePath = process.env.INIT_CWD + fileName;
    try {
        await fsPromises.writeFile(filePath, markdownContent);
        console.log(`Markdown file "${fileName}" created successfully at ${filePath}`);
    } catch (err) {
        console.error('Error creating Markdown file:', err);
    } finally {
        rl.close();
    }
}

function getCurrentDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
}

generateMarkdown().then(() => {
    /**/
})
