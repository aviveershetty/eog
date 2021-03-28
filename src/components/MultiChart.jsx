import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { useSelector } from 'react-redux';
import Card from '../components/Card';
import moment from 'moment';

export default function MultiChart() {
  const [dataArr, dataCon] = useState([]);
  const multiData = useSelector(state => state.multipleData.multipleData);
  const injValveData = useSelector(state => state.injValve.injValveData);
  const oilTempData = useSelector(state => state.oilTemp.oilTempData);
  const flareTempData = useSelector(state => state.flareTemp.flareTempData);
  const waterTempData = useSelector(state => state.waterTemp.waterTempData);
  const casingPressureData = useSelector(state => state.casingPressure.casingPressureData);
  const tubingPressureData = useSelector(state => state.tubingPressure.tubingPressureData);
  const activeMetrics = useSelector(state => state.activeMetrics.selectedMetrics);

  const filterByActive = data => {
    for (let i = 0; i < activeMetrics.length; i++) {
      if (data.metric === activeMetrics[i].metricName) {
        return true;
      }
    }
  };

  const dataForChart = dataArr.filter(filterByActive);

  useEffect(() => {
    if (multiData.length > 0) {
      return dataCon([
        { key: 1, metric: 'injValveOpen', measurements: multiData[0].measurements.concat(injValveData) },
        { key: 2, metric: 'oilTemp', measurements: multiData[1].measurements.concat(oilTempData) },
        { key: 3, metric: 'casingPressure', measurements: multiData[2].measurements.concat(casingPressureData) },
        { key: 4, metric: 'tubingPressure', measurements: multiData[3].measurements.concat(tubingPressureData) },
        { key: 5, metric: 'flareTemp', measurements: multiData[4].measurements.concat(flareTempData) },
        { key: 6, metric: 'waterTemp', measurements: multiData[5].measurements.concat(waterTempData) },
      ]);
    }
  }, [injValveData, casingPressureData, flareTempData, multiData, oilTempData, tubingPressureData, waterTempData]);

  const names = {
    injValveOpen: 'INJ Valve Open',
    oilTemp: 'Oil Temp',
    tubingPressure: 'Tubing Pressure',
    flareTemp: 'Flare Temp',
    casingPressure: 'Casing Pressure',
    waterTemp: 'Water Temp',
    default: 'metric',
  };

  const colors = {
    injValveOpen: '#1BD82A',
    oilTemp: '#000000',
    tubingPressure: '#FF0000',
    flareTemp: '#FFB201',
    casingPressure: '#830BEE',
    waterTemp: '#000CFF',
    default: '#00FFE0',
  };

  return (
    <>
      {activeMetrics.map(i => {
        if (i.metricName === injValveData[0].metric) {
          return (
            <Card
              key={i}
              color={colors[i.metricName]}
              metric={names[i.metricName]}
              data={`${injValveData[injValveData.length - 1].value}${injValveData[0].unit}`}
            />
          );
        } else if (i.metricName === oilTempData[0].metric) {
          return (
            <Card
              key={i + '5'}
              color={colors[i.metricName]}
              metric={names[i.metricName]}
              data={`${oilTempData[oilTempData.length - 1].value} ${oilTempData[0].unit}`}
            />
          );
        } else if (i.metricName === flareTempData[0].metric) {
          return (
            <Card
              key={i + '1'}
              color={colors[i.metricName]}
              metric={names[i.metricName]}
              data={`${flareTempData[flareTempData.length - 1].value} ${flareTempData[0].unit}`}
            />
          );
        } else if (i.metricName === waterTempData[0].metric) {
          return (
            <Card
              key={i + '2'}
              color={colors[i.metricName]}
              metric={names[i.metricName]}
              data={`${waterTempData[waterTempData.length - 1].value} ${waterTempData[0].unit}`}
            />
          );
        } else if (i.metricName === casingPressureData[0].metric) {
          return (
            <Card
              key={i + '3'}
              color={colors[i.metricName]}
              metric={names[i.metricName]}
              data={`${casingPressureData[casingPressureData.length - 1].value} ${casingPressureData[0].unit}`}
            />
          );
        } else if (i.metricName === tubingPressureData[0].metric) {
          return (
            <Card
              key={i + '4'}
              color={colors[i.metricName]}
              metric={names[i.metricName]}
              data={`${tubingPressureData[tubingPressureData.length - 1].value} ${tubingPressureData[0].unit}`}
            />
          );
        }
      })}
      <ResponsiveContainer width="100%" aspect={2.5 / 1.0}>
        <LineChart width={1200} height={600}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="at"
            type="category"
            allowDuplicatedCategory={false}
            tickFormatter={t => moment(t).format('hh:mm A')}
          />
          <YAxis
            yAxisId="left1"
            orientation="left"
            domain={[0, 1200]}
            ticks={[0, 200, 400, 600, 800, 1000, 1200]}
            stroke="#8884d8"
          >
            <Label value="F" position="insideTopLeft" offset={40} fill="#8884d8" fontSize={14} />
          </YAxis>
          <YAxis yAxisId="left2" orientation="left" domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} stroke="#888400">
            <Label value="%" position="insideTopLeft" offset={40} fill="#888400" fontSize={14} />
          </YAxis>
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, 2000]}
            ticks={[0, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000]}
            stroke="#82ca9d"
          >
            <Label value="PCI" position="insideTopLeft" offset={40} fill="#82ca9d" fontSize={14} />
          </YAxis>
          <Tooltip labelFormatter={t => moment(t).format('DD MMM YYYY hh:mm:ss')} />
          <Legend
            layout="horizontal"
            verticalAlign="top"
            align="center"
            wrapperStyle={{
              marginTop: '85px',
            }}
          />
          {dataForChart.map(i => {
            if (i.metric === 'oilTemp' || i.metric === 'flareTemp' || i.metric === 'waterTemp') {
              return (
                <Line
                  yAxisId="left1"
                  dataKey="value"
                  data={i.measurements}
                  name={names[i.metric]}
                  key={i.metric}
                  dot={false}
                  stroke={colors[i.metric]}
                />
              );
            } else if (i.metric === 'tubingPressure' || i.metric === 'casingPressure') {
              return (
                <Line
                  yAxisId="right"
                  dataKey="value"
                  data={i.measurements}
                  name={names[i.metric]}
                  key={i.metric}
                  dot={false}
                  stroke={colors[i.metric]}
                />
              );
            } else {
              return (
                <Line
                  yAxisId="left2"
                  dataKey="value"
                  data={i.measurements}
                  name={names[i.metric]}
                  key={i.metric}
                  dot={false}
                  stroke={colors[i.metric]}
                />
              );
            }
          })}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
