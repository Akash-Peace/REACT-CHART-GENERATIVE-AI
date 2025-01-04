import { GoogleGenerativeAI } from "@google/generative-ai";

let result;

const chartTypesDefinition = `
1. "column": Column charts use vertical bars to represent data, the x-axis shows categories being compared, the y-axis shows the values for each category.
2. "bar": Bar charts use horizontal bars to represent data, the y-axis shows categories being compared, the x-axis shows the values for each category.
3. "line": Line charts with data points connected by lines.
`;

const systemPrompt1 = `
Determine whether the given image is a valid column, bar, or line chart, and output the identified chart type or 'invalid'.

Output format: "column" or "bar" or "line" or "invalid".

The output should be "invalid" if:
1. The chart does not contain both an x-axis and a legend.
2. The image contains more than one chart.
3. A single chart contains multiple types of charts (e.g., a dual axes chart combining line and column).

If valid, determine the output as follows:
${chartTypesDefinition}
`;

const systemPrompt2 = `
Extract the data as per the output format from the image containing a ${result} chart. 

Determine the chart type as follows:
${chartTypesDefinition}

Output format:
{
  "type": ${result},
  "title": "Sales",
  "yAxisTitle": "Sales",
  "categories": ["North", "South", "East", "West"],
  "dataLabelPrefix": "INR",
  "dataLabelSuffix": "%",
  "series": [
    {
      "name": "2022",
      "color": "#FF0000",
      "data": [100, 150.5, 80, 120.9]
    }
  ]
}

Important Notes:
1. If a specific color cannot be determined from the image, identify and use the closest visually related colors.
2. If the chart does not have a title or y-axis title (yAxisTitle), exclude those keys from the output.
3. For bar charts, prioritize the x-axis title instead of the y-axis title. If there is an x-axis title, include it in yAxisTitle; if not, exclude the yAxisTitle from the output.
4. If the chart's data point number does not have a prefix (dataLabelPrefix) (e.g., $150, INR150) or suffix (dataLabelSuffix) (e.g., 80%, 80*), exclude those keys from the output.
5. If the chart does not have numbers directly attached to the data points, infer each data point's value by aligning it with the corresponding value on the y-axis based on its position.
6. If a data point number is prefixed or suffixed with any currency indicator (e.g., $, €), percentage (%), or multipliers such as thousand (k, K), million (m, M), billion (b, B), or trillion (t, T), convert it to a plain numeric value.
7. Do not include any additional text apart from output format.
`;

const resolvers = {
  Query: {
    getChartData: async (_, payload) => {
      const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      for (let systemPrompt of [systemPrompt1, systemPrompt2]) {
        result = await gemini.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })?.generateContent([
          {
            inlineData: {
              data: payload.image,
              mimeType: payload.fileType,
            },
          },
          systemPrompt,
        ]);
        if (result?.response?.text()?.trim() === 'invalid') {
          throw new Error('Detected invalid image / unsupported chart / multiple charts. Please try again with a different image which contains column, bar or line chart.');
        }
      }
      try {
        // To get rid of extra text (```json ... ```).
        result = JSON.parse(result?.response?.text()?.trim()?.slice(7, -3));
      } catch (error) {
        result = JSON.parse(result?.response?.text()?.trim());
      }
      return await result;
    },
  },
};

export default resolvers;
