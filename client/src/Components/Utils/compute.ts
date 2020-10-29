export const compute = (value: number, classes: any):string => {
	if (value <= 35) return classes["half25"];
	else if (value > 36 && value <= 60) return classes["half50"];
	else if (value > 61 && value < 100) return classes["half75"];
	else return classes["half100"];
}