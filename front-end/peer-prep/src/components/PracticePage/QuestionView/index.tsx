import { Chip, Typography, Stack } from '@mui/material';
import * as Styles from './styles';

import { useSelector } from 'react-redux';
import * as QuestionSlice from "../../redux/reducers/Question/QuestionSlice";

const QuestionView = () => {
    const currentTitle: string = useSelector(QuestionSlice.selectCurrentTitle);
    const currentComplexity: string = useSelector(QuestionSlice.selectCurrentComplexity);
    const currentCategories: string[] = useSelector(QuestionSlice.selectCurrentCategories);
    const currentDescription: string = useSelector(QuestionSlice.selectCurrentDescription);

    return (
        <div style={Styles.questionViewContainerStyle}>
            <div style={Styles.questionViewMainStyle}>
                <Typography sx={Styles.titleStyle}>{currentTitle}</Typography>
                    {
                        currentTitle === ""
                            ?   <></>
                            :   <Stack direction="row">
                                    <Chip label={currentComplexity} sx={Styles.difficultyChipStyle}/>
                                </Stack>
                    }

                    {
                        currentCategories[0] === ""
                            ?   <></>
                            :   <Stack direction="row" spacing={2}>
                                    {currentCategories.map((category: string) => {
                                        return (
                                            <Chip label={category} sx={Styles.categoryChipStyle}/>
                                        )
                                    })}
                                </Stack>
                    }

                    <Typography sx={Styles.descriptionStyle}>{currentDescription}</Typography>
            </div>
        </div>
    )
}

export default QuestionView;
