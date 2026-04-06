 const littleDocsData = [
    {
      headerText: 'Receipts',
      className: 'receipts',
      bodyText: '1 Pasta Rigatoni $3.99, 2 Egg Fritatta $6.99, 3 Poblano Peppers $2.99,',
      bodyHtml: (<div className="little-doc" key={'little-doc-1'} ><h1>Receipts</h1><ol><li>1 Pasta Rigatoni $3.99,</li><li>2 Egg Fritatta $6.99,</li><li>3 Poblano Peppers $2.99,</li></ol></div>),
      bodyHtmlString: `<div>Receipts<br />1 Pasta Rigatoni $3.99,<br />2 Egg Fritatta $6.99,<br />3 Poblano Peppers $2.99,</div>`
    },
    {
      headerText: 'Tax Forms',
      className: 'tax-forms',
      bodyText: 'Income: $123.456, Deductions: $23.332, Exemptions: 2,',
      bodyHtml: (<div className="little-doc" key={'little-doc-2'} ><h1>Tax Forms</h1>Income: $123.456,<br />Deductions: $23.332,<br /> Exemptions: 2,</div>),
      bodyHtmlString: `<div className="little-doc"><h1>Tax Forms</h1>Income: $123.456,<br />Deductions: $23.332,<br /> Exemptions: 2,</div>`
    },
    {
      headerText: 'Pot Pie',
      className: 'recipes',
      bodyText: 'In a medium bowl, whisk the egg until it is fluffy...',
      bodyHtml: (<div className="little-doc" key={'little-doc-3'} ><h1>Ingredients</h1>Mix the remaining 1 teaspoon cornstarch with ¼ cup water until smooth. Stir it into the wok and simmer until the sauce thickens and starts to turn glossy, 3 to 4 minutes. Add chicken and stir to combine. Top with spring onions.</div>),
      bodyHtmlString: `<div className="little-doc handwriting"><h1>Recipes</h1>mix the remaining 1 teaspoon cornstarch with ¼ cup water until smooth. Stir it into the wok and simmer until the sauce thickens and starts to turn glossy, 3 to 4 minutes. Add chicken and stir to combine. Top with spring onions.</div>)`
    },
    {
      headerText: 'Policies',
      className: 'policies',
      bodyText: 'Pursuant to your acceptance of this agreement...',
      bodyHtml: (<div className="little-doc" key={'little-doc-4'} ><h1>Policies</h1>Pursuant to your acceptance of this agreement all claims pertaining to seller will be held in the state of the...</div>),
      bodyHtmlString: `<div className="little-doc"><h1>Policies</h1>Pursuant to your acceptance of this agreement...</div>`
    },
    {
      headerText: 'Statements',
      className: 'statements',
      bodyText: 'Pursuant to your acceptance of this agreement...',
      bodyHtml: (<div className="little-doc" key={'little-doc-5'} ><h1>Statement</h1>Consolidated statement of commercial account. Date 11/30/2025 Customer number: 2631-45-061 You may sign up for online access to your account by visiting...</div>),
      bodyHtmlString: `<div className="little-doc"><h1>Policies</h1>Pursuant to your acceptance of this agreement...</div>`
    },
    {
      headerText: 'Chicken Manchurian',
      className: 'recipes',
      bodyText: 'In a medium bowl, whisk the egg until it is fluffy...',
      bodyHtml: (<div className="little-doc" key={'little-doc-3'}><h1>Recipes</h1>In a large wok or deep, high-sided skillet, heat oil on medium for 45 seconds. Add chicken (in batches, if necessary to avoid crowding) and cook until it starts turning white, 1 to 2 minutes. Flip the pieces and continue cooking until the chicken starts to turn golden, 2 to 3 minutes.</div>),
      bodyHtmlString: `<div className="little-doc handwriting"><h1>Recipes</h1>In a large wok or deep, high-sided skillet, heat oil on medium for 45 seconds. Add chicken (in batches, if necessary to avoid crowding) and cook until it starts turning white, 1 to 2 minutes. Flip the pieces and continue cooking until the chicken starts to turn golden, 2 to 3 minutes.</div>)`
    },
  ];

  export { littleDocsData };
