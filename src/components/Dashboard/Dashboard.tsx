import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import DoughnutChart from "../Common/DoughnutChart";
import RoundedButton from "../Common/RoundedButton/RoundedButton";
import Subscribers from "../Subscribers/Subscribers";
import classes from "./Dashboard.module.css";
import Department from "./Department";

function Dashboard() {
  const departments = useSelector(
    (state: RootState) => state.dashboard.departments
  );

  const [labels, setLabels] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [chartData, setChartData] = useState<number[]>([]);

  useEffect(() => {
    const labels: string[] = departments.map((department) => department.name);
    setLabels(labels);

    const colors: string[] = departments.map((department) => department.color);
    setColors(colors);

    const chartData: number[] = departments.map((department) =>
      department.projects.reduce(
        (previousValue, b) => previousValue + b.total,
        0
      )
    );
    setChartData(chartData);
  }, [departments]);

  return (
    <div className={classes.root}>
      <div className={classes.rightSide}>
        <h2>היי שמעון, צהריים טובים</h2>
        <div className={classes.departments}>
          <div className={classes.chartContainer}>
            <DoughnutChart
              labels={labels}
              datasetsData={chartData}
              backgroundColors={colors}
            />
          </div>
          {departments.map((department, idx) => (
            <Department
              key={idx}
              id={department.id}
              color={department.color}
              projects={department.projects}
              name={department.name}
            />
          ))}
        </div>
      </div>
      <div className={classes.leftSide}>
        <div className={classes.subscribers}>
          <Subscribers />
        </div>
        <div className={classes.createMissionBtnContainer}>
          <RoundedButton>+ צור משימה</RoundedButton>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
