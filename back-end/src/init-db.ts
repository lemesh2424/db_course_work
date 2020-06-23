import { initConnetion, ActionModel } from './database';

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
