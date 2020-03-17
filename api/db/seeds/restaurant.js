
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('restaurant').del()
    .then(function () {
      // Inserts seed entries
      return knex('restaurant').insert(
        [
          {
            row_guid: "208d9ad3-73d3-484f-a571-b64db0fd24fe",
            name: "Abacus Tavuk",
          },
          {

            row_guid: "d1d160bf-3fe5-41b4-a53c-c89543d189d0",
            name: "Adana Sofrası",
          },
          {

            row_guid: "eb2856b3-551f-49ac-a237-d484eec6e40b",
            name: "Abacus Tavuk",
          },
          {

            row_guid: "7bf535e5-cfc9-4e2f-9512-69667c689925",
            name: "Abacus Tavuk",
          },
          {
            row_guid: "1820de64-5b53-42d1-93ea-ecd71e6edc39",
            name: "Abacus Tavuk",
          },
          {
            row_guid: "f5b9dab2-46bd-4c3d-acac-3ff7ebd62f9e",
            name: "Abacus Tavuk",
          },
          {
            row_guid: "665a956c-e374-4285-a3bc-0048e06341d3",
            name: "Abacus Tavuk",
          },
          {
            row_guid: "9ac52252-519c-495c-b998-4f605c6e4ebc",
            name: "Abacus Tavuk",
          },
          {
            row_guid: "f881e741-d3c7-4b0c-9ff9-8288eaa462db",
            name: "Abacus Tavuk",
          },
          {
            row_guid: "a37435fd-bdde-41b9-8738-53c4fac8b765",
            name: "Abacus Tavuk",
          },
          {
            row_guid: "c155e10f-fd9a-458b-88d9-61ea19577a3e",
            name: "Abacus Tavuk",
          },
          {
            row_guid: "04f34ce6-3bf0-4e2b-bfd9-d83c2ef870a2",
            name: "Abacus Tavuk",
          },
          {
            row_guid: "591c47b1-34ed-431d-ab48-78cbfc16e9c4",
            name: "Abacus Tavuk",
          }
        ]
      );
    });
};
