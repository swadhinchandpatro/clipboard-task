# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

# 1. Create a new Table called FacilityAgents - (estimation 0.5 man sprints)
 - Create a primary key id having custom logic internal to facility team.
 - Refer to logic shared by Facility team to know aglorithm behind creating the aforementioned `id`.  
 - Create a foreign key external_agent_id and add constraint with reference to id column of Agents table.
 - Index the table based on external_agent_id.
 - Create the tables in test environment and test by inserting sample data.

# 2. Create method getCustomAgentIds
 - Create sql procedure getListofCustomAgentIds
 - The procedure should accept a agent id and return the custom agent id by running query over FacilityAgents table.
 - If the passed agent id is not in the table, then create an entry following the step mentioned in Steps 1.b.
 - Test the procedure in test environment.

# 3. Write Step/Function formatShiftDataWithCustomAgentId
 - The function formatShiftDataWithCustomAgentId should accept a list of shift data returned by the function getShiftsByFacility.
 - It should iterate over shift data and extract the agent ids.
 - It should pass the agent id for each shift record to run the aforementioned function `getCustomAgentIds` to get the custom agent id as maintained by Facility team.
 - It should return a new list of shift data with the `agent ids` manipulated by returned `custom agent ids`.
 - Test the function by writing unit tests

# 4. Integration
 - Integrate the function `formatShiftDataWithCustomAgentId` with the existing waterfall model of function chaining
 - Given a `facility id`, it should follow getShiftsByFacility ->  formatShiftDataWithCustomAgentId -> generateReport
 - Write integration tests to check if everything is working as expected.