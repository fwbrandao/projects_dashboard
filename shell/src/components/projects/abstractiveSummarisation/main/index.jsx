import React from 'react';
import {
    Box,
    makeStyles,
    Typography,
    Grid,
} from '@material-ui/core';

import AboutProject from '../../../../core/aboutProject/index.jsx';
import abstractiveSummaryData from '../abstractiveSummaryData';
import ControlledExpansionPanels from '../../../../core/infoExpansionPanel/index.jsx';

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    contentExplanation: {
        margin: "30px",
        display: "grid",
        justifyContent: "center",
        backgroundColor: theme.palette.primary.main,
        padding: "10px",
    },
    contentBody: {
        margin: "30px",
        padding: "10px",
        justifyContent: "center",
        backgroundColor: theme.palette.primary.main,
        '@media (max-width: 1024px)': {
            display: 'grid',
        }
    },
}))

const AbstractiveSummarisation = () => {
    const classes = useStyles();

    return (
        <Box>
            <div className={classes.toolbar} />
            <AboutProject
                title={abstractiveSummaryData.title}
                description={abstractiveSummaryData.description}
                gitHubLink={abstractiveSummaryData.gitHubLink}
                originalPaper={abstractiveSummaryData.literactureLink}
            />
            <Box mt={4} ml={18} mr={18} mb={2}>
                <ControlledExpansionPanels
                    className={classes.controlledExpansionPanels}
                    firstHeader={abstractiveSummaryData.infoExpantion.firstHeader}
                    firstText={abstractiveSummaryData.infoExpantion.firstText}
                    secondHeader={abstractiveSummaryData.infoExpantion.secondHeader}
                    secondText={abstractiveSummaryData.infoExpantion.secondText}
                    thirdHeader={abstractiveSummaryData.infoExpantion.thirdHeader}
                    thirdText={abstractiveSummaryData.infoExpantion.thirdText}
                />
            </Box>
            <Box className={classes.contentExplanation}>
                <Typography variant='body2' color="textPrimary">
                    To test the model we need a very long and complex article. Lets use the following text:
                </Typography>
                <br />
                <Typography variant='body2' color="textSecondary">
                    LONG_SPACEX_ARTICLE = """
                    WASHINGTON — NASA and SpaceX say they believe they have identified the Falcon 9 engine problem that aborted a GPS satellite launch in early October and delayed a commercial crew mission to the middle of November.

                    At an Oct. 28 briefing, Hans Koenigsmann, vice president of build and flight reliability at SpaceX, said the engine anomaly that aborted a Falcon 9 launch seconds before its scheduled liftoff Oct. 2 was caused by material that blocked a relief valve in the engine’s gas generator, which powers the engine’s turbopumps. The last-second abort prevented a hard start of the engine, he said, which could have damaged it.

                    He described the material found in the valve as a “masking lacquer,” a red substance similar to nail polish. The lacquer is used to protect surfaces when aluminum engine components are anodized for corrosion protection. That lacquer is then supposed to be removed with a cleaning fluid.

                    Koenigsmann said that anodizing work is done by a vendor, rather than in-house at SpaceX, and speculated that a change in processes there, such as using less cleaning fluid, could have caused the lacquer to remain. “We’ve talked to the people. We made them aware of that,” he said. “I’m pretty sure it will not happen any more.”

                    SpaceX examined the data from testing of other Merlin engines, and found two with similar engine startup signatures installed on the Falcon 9 booster that will be used for the Crew-1 commercial crew mission. SpaceX is replacing those two engines, as well as another Merlin engine installed on a Falcon 9 that will launch the Sentinel-6 Michael Freilich ocean science satellite Nov. 10.

                    NASA said Oct. 26 it has rescheduled the Crew-1 launch, previously planned for Oct. 31, to 7:49 p.m. Eastern Nov. 14. In that statement, NASA said the Crew-1 launch would take place “following a thorough review of launch vehicle performance” from the Sentinel-6 launch.

                    Agency officials at the briefing, though, offered mixed messages about the dependence of the Crew-1 launch on the Sentinel-6 launch. “Right now there is not a ‘hard bar’ between these missions,” said Kathy Lueders, NASA associate administrator for human exploration and operations, when asked if any delay in the Sentinel-6 launch would mean a delay for Crew-1. “We’re going to fly both missions when it’s the right time.”

                    Later in the call, Steve Stich, NASA commercial crew program manager, suggested the delayed GPS 3 mission would need to fly before Crew-1. “One of the engines that we are installing on the first stage has a slight change that we would like to see fly on the GPS 3 mission first,” he said. “We would like to see that one mission go fly before we fly crew.” SpaceX has yet to reschedule the GPS 3 launch.

                    NASA is continuing preparations for the Crew-1 mission based on a Nov. 14 launch. The four astronauts flying the mission entered what Stich called a “soft quarantine” at home with their families Oct. 25. They will go into a more stringent preflight quarantine Oct. 31 and travel to the Kennedy Space Center Nov. 6. A static-fire test of the Falcon 9’s first stage is scheduled for Nov. 9, followed by a final dress rehearsal for launch preparations Nov. 11.

                    A Nov. 14 launch would also enable a fast approach to the International Space Station, with docking about eight and a half hours after launch. Stich said that fast approach was enabled by the orbital alignment of the station for that particular launch opportunity, and is “about as short a time as we can accommodate” for the approach and docking of the spacecraft. If the launch slips a day to Nov. 15, the Crew Dragon would instead take 27.5 hours to dock with the station.

                    First, though, NASA and SpaceX must verify that the Falcon 9 is ready to launch that mission. “Over my life at SpaceX I’ve seen little things having big effects,” he said of the masking lacquer problem that aborted the GPS launch. “Rockets are humbling.”.
                    """.replace('\n','')
                </Typography>
                <br />
                <Typography variant='body2' color="textPrimary">
                    The model will then make sense of the context of article, and instead of using parts of the text to generate a traditional summary,
                    it will actually write a new, never seen before summary. See the output bellow.
                </Typography>
                <br />
                <Typography variant='body1' color="secondary">
                    Abstractive Summary: SpaceX says it has identified the Falcon 9 engine problem that aborted a GPS satellite launch. The problem was caused by material that blocked a relief valve in the engine’s gas generator. The last-second abort prevented a hard start of the engine, which could have damaged it. SpaceX has yet to reschedule the GPS 3 launch.
                </Typography>
            </Box>
        </Box>
    )
}

export default AbstractiveSummarisation;
