import React from 'react';
import AudioTimer from './audioTimer';
import { ReactMic } from 'react-mic';
import { tokens } from "../theme";
import { ColorModeContext, useMode } from "../theme";
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';
import mic from "../Images/mic.png";
import {
    Box,
    Button,
    TextField,
    Typography,
    IconButton,
    useTheme,
  } from "@mui/material";

const ReactRecorder = ({ recordBlobLink, setRecordBlobLink }) => {
    const [isRunning, setIsRunning] = React.useState(false);
    const [elapsedTime, setElapsedTime] = React.useState(0);
    const [voice, setVoice] = React.useState(false);
    // const [recordBlobLink, setRecordBlobLink] = React.useState(null);


    const onStop = (recordedBlob) => {
        setRecordBlobLink(recordedBlob.blobURL);
        setIsRunning(false)
    };

    const startHandle = () => {
        setElapsedTime(0)
        setIsRunning(true)
        setVoice(true)
    }
    const stopHandle = () => {
        setIsRunning(false)
        setVoice(false)
    }

    const clearHandle = () => {
        setIsRunning(false)
        setVoice(false)
        setRecordBlobLink(false)
        setElapsedTime(0)
    }


    const themes = useTheme();
    const colors = tokens(themes.palette.mode);

    return (
        <div>
            <div className=" max-w-sm py-4 px-6 mx-auto " 
                style={{
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    backgroundColor: colors.primary[500],
                    color: colors.grey[100],
                    borderRadius: "5px", 
                    border:`2px dashed ${colors.red[300]}`,
                }}
                >
                <div style={{display:'flex', flexDirection:'row', fontWeight: '700'}}>
                    <h3 className=" text-[22px] font-semibold ">Audio Recorder</h3>
                    {/* <MicOutlinedIcon /> */}
                    {/* <img src={mic} alt="Mic" width="50px" height="50px"/> */}
                </div>

                <AudioTimer isRunning={isRunning}
                    elapsedTime={elapsedTime}
                    setElapsedTime={setElapsedTime} />

                <ReactMic
                    record={voice}
                    className="sound-wave w-full "
                    onStop={onStop}
                    strokeColor="#000000"
                // backgroundColor="#FF4081"

                />
                <div 
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: '20px'
                    }}
                >
                    <div className=" mt-2 ">
                        {recordBlobLink ? <Button onClick={clearHandle} className="text-[#fff] font-medium text-[16px] "> Clear </Button> : ""}
                    </div>
                    <div className=" mt-2  ">
                        {/* {!voice ? <Button onClick={startHandle} className=" text-[#111] rounded-md py-1 px-3 font-semibold text-[16px] ">Start</Button> : <Button onClick={stopHandle} className=" text-[#111] rounded-md py-1 px-3 font-semibold text-[16px] ">Stop</Button>} */}
                        {!voice ? <IconButton onClick={startHandle} className=" text-[#111] rounded-md py-1 px-3 font-semibold text-[16px] "><PlayCircleOutlineOutlinedIcon fontSize='large'/></IconButton> : <IconButton onClick={stopHandle} className=" text-[#111] rounded-md py-1 px-3 font-semibold text-[16px] "><StopCircleOutlinedIcon fontSize='large'/></IconButton>}
                    </div>
                </div>
                <div className="">
                    {recordBlobLink ? <audio controls src={recordBlobLink} className="" /> : ""}

                </div>
            </div>
        </div>
    );
};

export default ReactRecorder;