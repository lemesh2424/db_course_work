import fs from 'fs';
import Papa, { ParseResult } from 'papaparse';
import { initConnetion, ActionModel } from './database';
import Joi from '@hapi/joi';

const CSVHeaderMap = {
    Name: 'name',
    Platform: 'platform',
    Year_of_Release: 'year',
    Genre: 'genre',
    Publisher: 'publisher',
    NA_Sales: 'NASales',
    EU_Sales: 'EUSales',
    JP_Sales: 'JPSales',
    Other_Sales: 'otherSales',
    Global_Sales: 'globalSales',
    Critic_Score: 'criticScore',
    Critic_Count: 'criticCount',
    User_Score: 'userScore',
    User_Count: 'userCount',
    Developer: 'developer',
    Rating: 'rating'
};

const validationSchema = Joi.object({
    name: Joi.string().required(),
    platform: Joi.string().required(),
    year: Joi.number().required(),
    genre: Joi.string().required(),
    publisher: Joi.string().required(),
    NASales: Joi.number().required(),
    EUSales: Joi.number().required(),
    JPSales: Joi.number().required(),
    otherSales: Joi.number().required(),
    globalSales: Joi.number().required(),
    criticScore: Joi.number().optional(),
    criticCount: Joi.number().optional(),
    userScore: Joi.string().optional().allow(''),
    userCount: Joi.number().optional(),
    developer: Joi.string().optional().allow(''),
    rating: Joi.string().optional().allow('')
});

export const ParsePromise = (file: string | File | NodeJS.ReadableStream) => {
    return new Promise<ParseResult>(function (complete, error) {
        Papa.parse(file, { complete, error, header: true });
    });
};

export const parse = async () => {
    await initConnetion();
    const stream = fs.createReadStream(process.cwd() + '/dataset/video-games-sales.csv');
    const { data } = await ParsePromise(stream);
    const documents = data.map(game => {
        const keys = Object.keys(game);
        const document = keys.reduce<any>((acc, gk) => {
            const value = game[gk] || undefined;
            return {
                ...acc,
                [(CSVHeaderMap as any)[gk]]: value
            }
        }, {});
        const { error } = validationSchema.validate(document);
        if (!error) {
            return document;
        } else {
            return undefined
        }
    }).filter(document => !!document);
    await ActionModel.insertMany(documents);
}

export const generate = async () => {
    await initConnetion();
    const documents = Array(10000).fill(0).map(() => {
        const browsers = ['Google Chrome', 'Firefox', 'Safari', 'Internet Explorer', 'Opera'];
        const browser = browsers[Math.floor(Math.random()*browsers.length)];

        const platforms = ['PC', 'Playstation', 'Xbox', 'Android', 'iOS', 'TV Station'];
        const platform = platforms[Math.floor(Math.random()*platforms.length)];

        const types = ['Click', 'Copy', 'Play video', 'Play audio', 'Typing', 'Redirect'];
        const type = types[Math.floor(Math.random()*types.length)];

        const date = new Date(2020, 5, 22, 0, 0, 0, 0);
        const hour = Math.floor(Math.random() * 23);
        date.setHours(hour, 0, 0, 0);

        return {
            type,
            platform,
            browser,
            date
        };
    });
    await ActionModel.insertMany(documents);
}

generate();
