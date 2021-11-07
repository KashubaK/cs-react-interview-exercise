# Hello CharacterStrong team!

I hope you enjoy using this tool I built for the coding challenge. You should find it elegant
and easy to use! I'm proud of what I've built considering the short timeframe, I'd say I put just about 8 hours into it total.
My focus was to build something useful, not just something to satisfy requirements. 

You can access it by going to this link: https://kashubak.github.io/cs-react-interview-exercise/

Features include:

- District searching
- Overview of district data including grades offered, student and teacher count, location address and phone number
- Map of schools within a district
- The ability to click on a school within a district and view its data
- Overview of school data including grades offered, student/teacher count, basic location data (with map), and a chart that compares grade population
- Client-side routing which allows you to copy & paste links to district or school details

Some feature ideas that could make this app more practical:

- School searching without having to search for districts first
- Link schools/districts to CharacterStrong data (i.e. is this district a CS client?)
- Somehow output a website URL of a resource (i.e. school district website URL)
- The ability to add notes to a school or district
- The ability to "share" a school or district resource via email

## Technical notes

- Added `eslint` into the project with my opinionated ruleset to enforce code style.
- Added some scripts into `package.json` to make linting and type-checking easier
- Implemented client-side routing with `react-router`, routes include district search, district detail view and school detail view
- Implemented re-used components `Page`, `DataTile`, and `DistrictMap` used throughout the app
- Implemented custom `useFetch` hook to simplify HTTP request logic in component source
- Used `@react-google-maps/api` library to display maps of schools within a district
- Implemented grade population chart with `chart.js` and `react-chartjs-2`
- Used two other NCES APIs, namely the `Public School Characteristics` and `School District Characteristics` to get more details on each model
- Added new `Glob` usage to render some blue blobs at the bottom-right of the screen
- Moved `Glob` rendering from `Header` to a new `Globs` component which is rendered by `App`
