const { error } = require("./src/constants");
const File = require("./src/file");
const { rejects, deepStrictEqual } = require("assert");

(async () => {
  {
    const filePath = "./mocks/emptyFile-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/fourItems-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/threeItems-valid.csv";
    const result = await File.csvToJson(filePath);
    const expected = [
			{
				"name": "Matheus Costa",
				"id": 123,
				"profession": "NodeJS Engineer",
				"birthDay": 2001
			},
			{
				"name": "Erick Wendel",
				"id": 124,
				"profession": "JavaScript Instructor",
				"birthDay": 1997
			},
			{
				"name": "Erick Wendel",
				"id": 125,
				"profession": "JavaScript Instructor",
				"birthDay": 1997
			}
		]

    await deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();
