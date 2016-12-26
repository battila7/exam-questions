module.exports =
      require("yargs")
      .usage("Usage: $0 FILES [TYPE]")
      .demand(1)
      .example("$0 foo bar")
      .alias("t", "type")
      .describe("t", "the type of the input files")
      .choices("t", ["simple", "json"])
      .default("t", "simple")
      .argv;
