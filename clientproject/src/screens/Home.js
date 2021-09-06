import React, { useState, useEffect } from 'react';
import FileUploadScreen from './FileUploadScreen';
import { getMultipleFiles } from '../data/api';
import { Link } from "react-router-dom";
const Home = () => {
    const [multipleFiles, setMultipleFiles] = useState([]);
    const isLoginTrue = JSON.parse(localStorage.getItem("login"));
    const userNotLogin = () => (
        <>
            <div className="col 12 text-center">
                <h5>It seem's like you are not login</h5>
                <h6>
                    If you have an account, then please <Link to="/login">Login</Link>
                </h6>
                <h6>
                    Don't have an account, then please do{" "}
                    <Link to="/register">Register</Link>
                </h6>
            </div>
        </>
    );

    const getMultipleFilesList = async () => {
        try {
            const fileslist = await getMultipleFiles();
            setMultipleFiles(fileslist);
            console.log(multipleFiles);
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        getMultipleFilesList();
    }, []);
    return (
        <>
            {isLoginTrue && isLoginTrue.userLogin ?
                <div>
                    <div className="container">
                        <FileUploadScreen getMultiple={() => getMultipleFilesList()} />
                    </div>
                    <div className="container-fluid mt-3">
                        <div className="row">
                            <div className="col-12">
                                {multipleFiles.map((element, index) =>
                                    <div key={element._id}>
                                        <h6 className="text-danger font-weight-bold">{element.title}</h6>
                                        <div className="row">
                                            {element.files.map((file, index) =>
                                                <div className="col-3">
                                                    <div className="card mb-2 border-1 p-2">
                                                        <img src={`http://localhost:8080/${file.filePath}`} height="200" className="card-img-top img-responsive" alt="img" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                : <>{userNotLogin()}</>}
        </>
    );
}

export default Home;
