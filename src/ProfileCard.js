import React, { useState, useEffect } from 'react';
import './App.css';
function EditableField({ fieldName, value, editing, onChange, onSave }) {
    const [fieldValue, setFieldValue] = useState(value); // Add state to manage input field value

    const handleChange = (e) => {
        setFieldValue(e.target.value); // Update the state with the new value
    };

    const handleSave = () => {
        onSave(fieldName, fieldValue); // Pass the field value to onSave function
    };

    return (
        <div>
            {editing ? (
                <input
                    type="text"
                    value={fieldValue} // Use the state value for the input field value
                    onChange={handleChange}
                    style={{ color: 'black' }}
                />
            ) : (
                <span>{value}</span>
            )}
            {editing ? (
                <button  className="save-button" onClick={handleSave}>Save</button>
            ) : (
                <button className="edit-button" onClick={() => onChange(fieldName)}>Edit</button>
            )}
        </div>
    );
}

function ProfileCard() {
    const [user, setUser] = useState(null);
    const [editingField, setEditingField] = useState(null);
    const [showSitingScreen, setShowSitingScreen] = useState(false);

    useEffect(() => {
        const username = localStorage.getItem('name');
        fetchUserData(username)
            .then(userData => {
                setUser(userData);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

     
    async function fetchUserData(username) {
        try {
            const response = await fetch(`http://172.20.10.2:3000/api/userdata?username=${username}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Response is not in JSON format');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching user data:', error);
            return null;
        }
    }

    async function saveField(fieldName, value) {
        try {
            const response = await fetch(`http://172.20.10.2:3000/api/updateUserData`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: user.user.username,
                    field: fieldName,
                    value: value,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update user data');
            }
            if (fieldName === 'username') {
                localStorage.setItem('name', value);
            }    

            setUser(prevUser => ({
                ...prevUser,
                user: {
                    ...prevUser.user,
                    [fieldName]: value,
                },
            }));

            setEditingField(null);
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    }

    function openEditing(fieldName) {
        setEditingField(fieldName);
        setShowSitingScreen(true); // Show the Siting screen when editing starts
    }

    function closeEditing() {
        setEditingField(null);
        setShowSitingScreen(false); // Hide the Siting screen when editing ends
    }
    
    function renderProfileCard(darkSide) {
        if (!user) return null;

        const { username, jobTitle, bio, country, phone, email } = user.user;

        return (
            <div className="card-container bg-white border p-3 border-l-4 border-black dark:bg-gray-800 dark:text-white md:w-96 lg:w-80 xl:w-96 ml-0"
                style={{ bottom: '100%', left: '100%', transform: 'translate(-1%, -1%)', marginTop: '90px', marginLeft: '20px' }}>
                    <div className="icon-containe dark:text-white" style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer',  }} onClick={() => setShowSitingScreen(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
                        <path d="M13.1875 3 L13.03125 3.8125 L12.4375 6.78125 C11.484375 7.15625 10.625 7.683594 9.84375 8.3125 L6.9375 7.3125 L6.15625 7.0625 L5.75 7.78125 L3.75 11.21875 L3.34375 11.9375 L3.9375 12.46875 L6.1875 14.4375 C6.105469 14.949219 6 15.460938 6 16 C 6 16.539063 6.105469 17.050781 6.1875 17.5625 L 3.9375 19.53125 L 3.34375 20.0625 L 3.75 20.78125 L 5.75 24.21875 L 6.15625 24.9375 L 6.9375 24.6875 L 9.84375 23.6875 C 10.625 24.316406 11.484375 24.84375 12.4375 25.21875 L 13.03125 28.1875 L 13.1875 29 L 18.8125 29 L 18.96875 28.1875 L 19.5625 25.21875 C 20.515625 24.84375 21.375 24.316406 22.15625 23.6875 L 25.0625 24.6875 L 25.84375 24.9375 L 26.25 24.21875 L 28.25 20.78125 L 28.65625 20.0625 L 28.0625 19.53125 L 25.8125 17.5625 C 25.894531 17.050781 26 16.539063 26 16 C 26 15.460938 25.894531 14.949219 25.8125 14.4375 L 28.0625 12.46875 L 28.65625 11.9375 L 28.25 11.21875 L 26.25 7.78125 L 25.84375 7.0625 L 25.0625 7.3125 L 22.15625 8.3125 C 21.375 7.683594 20.515625 7.15625 19.5625 6.78125 L 18.96875 3.8125 L 18.8125 3 Z M 14.8125 5 L 17.1875 5 L 17.6875 7.59375 L 17.8125 8.1875 L 18.375 8.375 C 19.511719 8.730469 20.542969 9.332031 21.40625 10.125 L 21.84375 10.53125 L 22.40625 10.34375 L 24.9375 9.46875 L 26.125 11.5 L 24.125 13.28125 L 23.65625 13.65625 L 23.8125 14.25 C 23.941406 14.820313 24 15.402344 24 16 C 24 16.597656 23.941406 17.179688 23.8125 17.75 L 23.6875 18.34375 L 24.125 18.71875 L 26.125 20.5 L 24.9375 22.53125 L 22.40625 21.65625 L 21.84375 21.46875 L 21.40625 21.875 C 20.542969 22.667969 19.511719 23.269531 18.375 23.625 L 17.8125 23.8125 L 17.6875 24.40625 L 17.1875 27 L 14.8125 27 L 14.3125 24.40625 L 14.1875 23.8125 L 13.625 23.625 C 12.488281 23.269531 11.457031 22.667969 10.59375 21.875 L 10.15625 21.46875 L 9.59375 21.65625 L 7.0625 22.53125 L 5.875 20.5 L 7.875 18.71875 L 8.34375 18.34375 L 8.1875 17.75 C 8.058594 17.179688 8 16.597656 8 16 C 8 15.402344 8.058594 14.820313 8.1875 14.25 L 8.34375 13.65625 L 7.875 13.28125 L 5.875 11.5 L 7.0625 9.46875 L 9.59375 10.34375 L 10.15625 10.53125 L 10.59375 10.125 C 11.457031 9.332031 12.488281 8.730469 13.625 8.375 L 14.1875 8.1875 L 14.3125 7.59375 Z M 16 11 C 13.25 11 11 13.25 11 16 C 11 18.75 13.25 21 16 21 C 18.75 21 21 18.75 21 16 C 21 13.25 18.75 11 16 11 Z M 16 13 C 17.667969 13 19 14.332031 19 16 C 19 17.667969 17.667969 19 16 19 C 14.332031 19 13 17.667969 13 16 C 13 14.332031 14.332031 13 16 13 Z" />
                    </svg>
                </div>

                <div className="image overflow-hidden">
                    <span className="text-black-500">
                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </span>
                </div>
                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1 dark:text-white">{username}</h1>
                <h3 className="text-gray-600 font-lg text-semibold leading-6 dark:text-white">{jobTitle}</h3>
                <p className="text-sm md:text-base lg:text-lg xl:text-lg text-gray-500 hover:text-gray-600 leading-6 dark:text-white">{bio}</p>
                <div className="mt-3 overflow-y-auto">
                    <h3 className="font-bold text-sm md:text-base lg:text-lg xl:text-lg">ADDRESS</h3>
                    <p><i className="fa-solid fa-location-dot "></i>{country}</p>
                    <p><i className="fa-solid fa-phone "></i>{phone}</p>
                    <p><i className="fa-solid fa-envelope "></i>{email}</p>
                </div>
            </div>
        );
    }

    return (
        <div>
        {user && renderProfileCard()}
        {user && showSitingScreen && ( // Render Siting screen only when showSitingScreen is true
            <SitingScreen
                username={user.user.username}
                password={user.user.password}
                jobTitle={user.user.jobTitle}
                bio={user.user.bio}
                country={user.user.country}
                phone={user.user.phone}
                email={user.user.email}
                editingField={editingField}
                openEditing={openEditing}
                saveField={saveField}
                closeEditing={closeEditing} 
                setShowSitingScreen={setShowSitingScreen} 
            />
        )}
    </div>
);
}

function SitingScreen({ username, password, jobTitle, bio, country, phone, email, editingField, openEditing, saveField, setShowSitingScreen,  }) {
    useEffect(() => {
        function handleClickOutside(event) {
            const sitingScreen = document.getElementById('Siting');
            
            const isOutsideEditingArea = !sitingScreen.contains(event.target);
            
            // Check if the target is an input field before closing
            const isInputField = event.target.tagName === 'INPUT';
    
            if (isOutsideEditingArea && !isInputField) {
                setShowSitingScreen(false); 
            }
        }
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setShowSitingScreen]);
    return (
        <div  className={`fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-screen ${setShowSitingScreen ? '' : 'hidden'}`}>
            <div className="flex justify-center items-center mt-20">
                <div id="Siting"className="bg-gray-700 p-6 rounded-md border-2">
                    <h2 className="text-white text-lg font-bold mb-3">Profile Information</h2>
                    <p className="text-white mt-2 text-container">
                        <strong>Username:</strong>
                        <EditableField
                            fieldName="username"
                            value={username}
                            editing={editingField === 'username'}
                            onChange={openEditing}
                            onSave={saveField}
                        />
                    </p>
                    <p className="text-white mt-2 text-container">
                        <strong>Password:</strong>
                        <EditableField
                            fieldName="password"
                            value={password}
                            editing={editingField === 'password'}
                            onChange={openEditing}
                            onSave={saveField}
                        />
                    </p>
                    <p className="text-white mt-2 text-container">
                        <strong>Job Title:</strong>
                        <EditableField
                            fieldName="jobTitle"
                            value={jobTitle}
                            editing={editingField === 'jobTitle'}
                            onChange={openEditing}
                            onSave={saveField}
                        />
                    </p>
                    <p className="text-white mt-2 text-container">
                        <strong>Bio:</strong>
                        <EditableField
                            fieldName="bio"
                            value={bio}
                            editing={editingField === 'bio'}
                            onChange={openEditing}
                            onSave={saveField}
                        />
                    </p>
                    <p className="text-white mt-2 text-container">
                        <strong>Country:</strong>
                        <EditableField
                            fieldName="country"
                            value={country}
                            editing={editingField === 'country'}
                            onChange={openEditing}
                            onSave={saveField}
                        />
                    </p>
                    <p className="text-white mt-2 text-container">
                        <strong>Phone:</strong>
                        <EditableField
                            fieldName="phone"
                            value={phone}
                            editing={editingField === 'phone'}
                            onChange={openEditing}
                            onSave={saveField}
                        />
                    </p>
                    <p className="text-white mt-2 text-container">
                        <strong>Email:</strong>
                        <EditableField
                            fieldName="email"
                            value={email}
                            editing={editingField === 'email'}
                            onChange={openEditing}
                            onSave={saveField}
                        />
                    </p>
                </div>
            </div>
        </div>
    );
}


export default ProfileCard;
