import React, { useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import { IAverageDamageData } from 'types/mappedStats';
import { Typography } from '@material-ui/core';
import { AverageDamageTooltip } from './Tooltips';

const useStyles = makeStyles((theme: Theme) => ({
  chartContainer: {
    width: '100%',
    height: 300,
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(1),
    color: theme.palette.getContrastText(theme.palette.background.paper),
  },
}));

interface IAverageDamageChartProps {
  data: IAverageDamageData;
  series: string[];
}
const AverageDamageChart = ({ data, series }: IAverageDamageChartProps) => {
  const classes = useStyles();
  const theme = useTheme();

  const xAxisFormatter = useCallback(toughness => `T${toughness}`, []);

  return (
    <div>
      <Typography variant="h6" className={classes.title}>
        Average Damage Per Toughness
      </Typography>
      <div className={classes.chartContainer}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.graphs.grid} />
            <XAxis stroke={theme.palette.graphs.axis} dataKey="toughness" tickFormatter={xAxisFormatter} />
            <YAxis stroke={theme.palette.graphs.axis} />
            <Tooltip content={<AverageDamageTooltip />} cursor={{ fill: theme.palette.graphs.grid }} />
            <Legend />
            {series.map((key, index) => (
              <Bar key={key} dataKey={key} fill={theme.palette.graphs.series[index]} strokeDasharray="3 3" />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AverageDamageChart;
