//@ts-check

const { Message } = require("discord.js");
const Client = require("../Client");


module.exports = class Command {

    /**
     * 
     * @param {Client} client 
     * @param {Object} options
     * @param {string} options.name
     * @param {?string} options.description
     * @param {?string} options.alias
     * @param {?string[]} options.permissions
     * @param {?boolean} options.args
     * @param {number} options.minArgs
     * @param {?string[]} options.expectedArgs
     * @param {?(string[])} options.usage
     * @param {?boolean} options.moderator
     * @param {?boolean} options.admin
     * @param {?boolean} options.owner
     * @param {?boolean} options.enabled
     */
    constructor(client, options) {

        /** @type {string} Name of the command */
        this.name = options.name;

        /** @type {string} Describes what the command does / is used for */
        this.description = options.description;

        /** @type {string} A shortened name for this command*/
        this.alias = options.alias;

        /** 
         * @type {string[]} A list of the user and / or channel 
         * permissions necessary to run this command 
         */
        this.permissions = options.permissions || ["SEND_MESSAGES"];

        /** 
         * @type {boolean} Whether or not the user needs to provide 
         * arguments to run this command
         */
        this.args = options.args || false;

        /** 
         * @type {number} The minimum number of arguments required to run the command 
         * aside from a potential 0 argument use case 
         */
        this.minArgs = options.minArgs || 0;

        /** @type {string[]} A list of the expected primary arguments  */
        this.expectedArgs = options.expectedArgs;

        /**  @type {string[]} A string containing examples on how to use the command */
        this.usage = [...options.usage || `${client.prefix}.${this.name}`];

        /** 
         * @type {boolean} Whether or not this command requires a user to be a moderator 
         * to invoke 
         */
        this.moderator = options.moderator || false;

        /** 
         * @type {boolean} Whether or not this command requires a user to have the
         * Administrator permission to invoke 
         */
        this.admin = options.admin || false;

        /** 
         * @type {boolean} Whether or not this command can only be used by the 
         * owner of the server
         */
        this.owner = options.owner || false;

        /**
         * @type {boolean} Whether or not this command is disabled.
         * Note: Command state "toggle" commands should never be disabled.
         */
        this.enabled = options.enabled || true;
    }

    /**
     * 
     * @param {Message} message
     * @param {string[]} args
     * @returns {string[]}
     */
    validateCommandInvocation(message, args) {
        const reasons = [];
        if (this.args && (args.length == 0))
            reasons.push("");

        if (args.length) {
            if (this.expectedArgs && !this.expectedArgs.includes(args[0]))
                reasons.push("");

            if (args.length < this.minArgs) 
                reasons.push("");
        }

        
        return reasons;
    }
}
