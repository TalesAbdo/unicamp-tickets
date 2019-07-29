const test = require('tape');
// const UserModel = require('../models/User');

// test('should return a section of SQL query that selects tickets in which the user is the owner or a subscriber when the role property is 1', (assert) => {
//     const expected = 'WHERE (t.owner_id = 1 OR t.id IN (SELECT s.ticket_id FROM smart_ticket.subscriber AS s WHERE s.user_id = 1))';
//     const result = 'WHERE (t.owner_id = 1 OR t.id IN (SELECT s.ticket_id FROM smart_ticket.subscriber AS s WHERE s.user_id = 1))';
//     assert.equal(result, expected, 'query is correct');
//     assert.end();
// });

// test('should return an user info', async (assert) => {
//     const id = 1;
//     const connection = { query: () => {} };
//     const stubbedConnection = sinon.stub(connection, 'query').returns([]);
//     const result = await UserModel.getTeamMembers(connection, 27);
//     const queryArg = utils.getFormatedQuery(stubbedConnection.getCall(0).args[0]);
//     const query = utils.getFormatedQuery(`SELECT DISTINCT u.ID, u.NAME, u.SERIAL, u.EMAIL FROM
//                                           SMART_TICKET.USER as u
//                                           INNER JOIN SMART_TICKET.TEAM_MEMBER as tm ON tm.USER_ID = u.ID
//                                           WHERE tm.TEAM_ID IN (${teamId})`);

//     assert.equal(result.status, responses.GET_TEAM_MEMBERS.success.status, 'Status is correct');
//     assert.equal(Array.isArray(result.data), true, 'Should return an array');
//     assert.equal(queryArg, query, 'Query is correct');

//     stubbedConnection.restore();
//     assert.end();
// });
