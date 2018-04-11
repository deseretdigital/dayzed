const rollupConfig = require("kcd-scripts/config").getRollupConfig();

Object.assign(rollupConfig, {
  external: [
    "preact",
    "react",
    "prop-types",
    "date-fns/add_days",
    "date-fns/is_before",
    "date-fns/is_today",
    "date-fns/start_of_day",
    "date-fns/difference_in_calendar_months"
  ],
  output: [
    Object.assign(rollupConfig.output[0], {
      globals: {
        react: "React",
        preact: "preact",
        "prop-types": "PropTypes",
        "date-fns/add_days": "dateFns.addDays",
        "date-fns/is_before": "dateFns.isBefore",
        "date-fns/is_today": "dateFns.isToday",
        "date-fns/start_of_day": "dateFns.startOfDay",
        "date-fns/difference_in_calendar_months":
          "dateFns.differenceInCalendarMonths"
      }
    })
  ]
});

module.exports = rollupConfig;
