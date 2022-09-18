//@ts-check

const { writeFileSync, readdir, readdirSync } = require("fs");
const { Client, Collection, Message } = require("discord.js");
const { join } = require("path");
const Command = require("./commands/Command");

module.exports = class SteveClient extends Client {

    /**
     * @param {import("discord.js").ClientOptions} options 
     */
    constructor(options) {
        super(options);

        this.config = require("../config.json");

        /**
         * @type {Collection<string, Command>}
         */
        this.commands = new Collection()

        /**
         * @type {Collection<string, Command>}
         */
        this.aliases = new Collection();

        /**
         * @type {Collection<string, Event>}
         */
        this.events = new Collection();

        /** 
         * @type {Collection<string, Message[]>} 
         */
        this.edits = new Collection();

        /**
         * @type {Collection<string, Message>}
         */
        this.deletes = new Collection();

        this.initHandlers();
    }

    initHandlers() {
        readdirSync(join(__dirname, "handlers"))
            .filter(file => file.endsWith("handler.js"))
            .forEach(handler => require("./handlers/" + handler)(this));
    }

    get prefix() {
        return this.config.prefix;
    }

    set prefix(change) {
        this.config.prefix = change;
    }

    /**
     * @param {number} delay
     */
    async sleep(delay) {
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    /**
     * @param {Message} message
     * @param {number | undefined} delay
     */
    async deleteMessage(message, delay = 5_000) {
        await this.sleep(delay);
        try {
            await message.delete();
        } catch (error) {
            console.log("ERROR: Could not delete a message. It may have been deleted by someone...");
        }
    }

    overwriteConfig() {
        const data = JSON.stringify(this.config, null, 4);
        writeFileSync("./config.json", data);
    }

    externalOverrideConfig(config) {
        this.config = config;
        this.overwriteConfig();
    }
}
