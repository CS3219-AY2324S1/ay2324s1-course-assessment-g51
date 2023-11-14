import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import * as PracticeSlice from "../../../redux/reducers/Practice/PracticeSlice";

const SelectSmall = () => {
	const dispatch = useDispatch();
	const language: string = useSelector(PracticeSlice.selectLanguageState);

	const handleChange = (event: SelectChangeEvent) => {
		dispatch(PracticeSlice.setLanguage(event.target.value));
	};

	return (
		<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
			<InputLabel id="demo-select-small-label">Language</InputLabel>
			<Select
				labelId="demo-select-small-label"
				id="demo-select-small"
				value={language}
				label="Choose Language"
				onChange={handleChange}
			>
				<MenuItem value={"python"}>Python</MenuItem>
				<MenuItem value={"java"}>Java</MenuItem>
				<MenuItem value={"javascript"}>Javascript</MenuItem>
				<MenuItem value={"csharp"}>C#</MenuItem>
				<MenuItem value={"cpp"}>C++</MenuItem>{" "}
			</Select>
		</FormControl>
	);
};

export default SelectSmall;
