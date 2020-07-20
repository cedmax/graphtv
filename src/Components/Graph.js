import React, { PureComponent } from "react";
import {
  VictoryLine,
  VictoryLabel,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryScatter,
  VictoryTooltip,
} from "victory";
import { linearRegression, linearRegressionLine } from "simple-statistics";
import randomColor from "randomcolor";
import { transform } from "../helpers/graph-data";

const formatLabel = (d) => `${d.title} - ${d.date}\n${d.y.toFixed(2)}⭑`;
const Label = <VictoryTooltip style={{ fontSize: 13, whiteSpace: "pre" }} />;

const regressionLine = (colors) => (data, i) => {
  const reg = linearRegression(data.map(({ x, y }) => [x, y]));
  const line = linearRegressionLine(reg);
  const dataLine = data.map(({ x, y }) => ({ x, y: line(x) }));
  const stroke = randomColor({
    luminosity: "light",
    hue: colors[i],
  });

  return (
    <VictoryLine
      scale={{ y: "log" }}
      key={i}
      style={{
        data: {
          stroke,
        },
      }}
      standalone={false}
      data={dataLine}
    />
  );
};

const scatter = (colors) => (data, i) => (
  <VictoryScatter
    labelComponent={Label}
    labels={formatLabel}
    key={i}
    style={{
      data: { fill: colors[i] },
    }}
    standalone={false}
    data={data}
  />
);

export default class Graph extends PureComponent {
  render() {
    const { data, title } = this.props;
    if (!data) return null;

    const mappedData = transform(data);
    const colors = randomColor({
      luminosity: "dark",
      count: mappedData.length,
    });

    return (
      <VictoryChart
        domainPadding={{ x: 10, y: [20, 0] }}
        width={1200}
        theme={VictoryTheme.material}
      >
        <VictoryAxis
          style={{ tickLabels: { display: "none" } }}
          label={title}
          axisLabelComponent={<VictoryLabel dy={20} />}
        />
        <VictoryAxis dependentAxis />
        {mappedData.map(scatter(colors))}
        {mappedData.map(regressionLine(colors))}
      </VictoryChart>
    );
  }
}
