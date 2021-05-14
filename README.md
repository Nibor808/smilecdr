# HAPI FHIR Playground: Basic Test App

### Development

I didn't add any libraries other than a date picker.

The instructions read `...and a date picker for date of birth.`.

I used one which reduced the need to properly format the dates except for in `patientSearch`.

Consequently, the minimal styling that has been applied is straight css.

Using `boostrap` or `materialui` for styling may have been simpler, but maybe not.

Using `moment.js` or `day.js` for the dates would have simplified things slightly.

I wasn't sure if you wanted all the components on one page or if I should implement a router and links. Elected to not
implement the router.

Practitioners DOB's, when present, were already formatted (YYYY/MM/DD), so I didn't implement any formatting there.

If I had more time I might have displayed the questionnaire response in a better layout but chose to use the `<pre>` tag
for expediency.

Also may have used a modal for the `delete` confirmation in Practitioner but chose `window.confirm` again for
expediency.

### Challenges

The api doesn't always return usable data.

Api requests will often return the same data over and over again which makes it challenging when it is returning
unusable data. eg no DOB's for sorting task.

Waiting a few minutes seems to get new data.
