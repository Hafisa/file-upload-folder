

import React, { useState, useEffect } from 'react';
import { multipleFilesUpload } from '../data/api';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const FileUploadScreen = (props) => {
    const [multipleFiles, setMultipleFiles] = useState('');
    const [title, setTitle] = useState('sample');
    const [multipleProgress, setMultipleProgress] = useState(0);

    const MultipleFileChange = (e) => {
        setMultipleFiles(e.target.files);
        setMultipleProgress(0);
    }

    const mulitpleFileOptions = {
        onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
            setMultipleProgress(percentage);
        }
    }

    const UploadMultipleFiles = async () => {
        const formData = new FormData();
        formData.append('title', title);
        for (let i = 0; i < multipleFiles.length; i++) {
            formData.append('files', multipleFiles[i]);
        }
        await multipleFilesUpload(formData, mulitpleFileOptions);
        props.getMultiple();
    }
    
    return (
        <div className="row mt-3 border-bottom">
            <div className="col-12">
                <div className="row">
                    <div className="col-4">
                        <h6 >Title</h6>
                        <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder="enter title for your gallery" className="form-control" />
                    </div>
                    <div className="col-8">
                        <div className="form-group">
                            <h6>Select Multiple Files</h6>
                            <input type="file" onChange={(e) => MultipleFileChange(e)} className="form-control" multiple />
                        </div>
                    </div>
                </div>
                <div className="row text-center mt-10">
                    <div className="col-10 p-2">
                        <button type="button" onClick={() => UploadMultipleFiles()} className="btn btn-danger">Upload</button>
                    </div>
                    <div className="col-1">
                        {multipleProgress > 0 ?
                            <CircularProgressbar
                                value={multipleProgress}
                                text={`${multipleProgress}%`}
                                styles={buildStyles({
                                    rotation: 0.1,
                                    strokeLinecap: 'butt',
                                    textSize: '16px',
                                    pathTransitionDuration: 0.5,
                                    pathColor: `rgba(255, 136, 136, ${multipleProgress / 100})`,
                                    textColor: '#f88',
                                    trailColor: '#d6d6d6',
                                    backgroundColor: '#3e98c7',
                                })}
                            />
                            : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FileUploadScreen;
