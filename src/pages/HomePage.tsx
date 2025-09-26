import InitialState from "../components/state/InitialState";
import ConfigureJudgesState from "../components/state/ConfigureJudgesState";
import { useAppState } from "../context/AppStateContext";
const HomePage = () => {
  const { appState, setAppState } = useAppState();
  const stateMap = [
    {
      name: "initial",
      component: InitialState,
    },
    {
      name: "configuring-judges",
      component: ConfigureJudgesState,
    },
  ];

  return (
    <div className="h-screen w-full flex flex-col items-center">
      {stateMap.map(({ name, component: Component }) =>
        name === appState ? <Component key={name} /> : null
      )}
    </div>
  );
};
export default HomePage;
