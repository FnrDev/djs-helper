'use strict';
const { Guild, GuildMember } = require('discord.js');

/**
 * Get member from guild;
 * @param {Guild} guild - The guild to get member from.
 * @param {GuildMember} id - The guildMember to get.
 * @returns {GuildMember} The guild member.
 * @see 
 https://github.com/Amir-78/djs-helper/tree/master#documentation
 */

async function getMember(guild = null, id = null) {
    // Throwing necessary errors
    if (typeof id !== 'string') throw new TypeError('id must be a string');
    if (typeof guild !== 'object') throw new TypeError('guild must be a object');
    // Get member using id;
    try {
        let member = guild.members.cache.get(id);
        if (!member) {
            member = guild.members.cache.find(member => member.id == id);
            if (!member) {
                member = await guild.members.fetch(id)
                if (!member) {
                    console.error(`Member with id: ${id} not found in guild: ${guild.name}`)
                    return null;
                }
            }
        }
        return member;
    } catch (err) {
        console.error(err)
        return null;
    }
};

module.exports = { getMember }