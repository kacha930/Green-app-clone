import React, { useState, useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";
import Conversation from "../components/Conversation";
import ContactList from "../components/ContactList";

function WhatsApp() {
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = setTimeout(() => {
            if (progress >= 100) setLoading(false);
            else {
                const increment = Math.floor(Math.random() * (10 + 1)) + 7;
                setProgress(progress + increment);
            }
        }, 300);

        return () => clearTimeout(id);
    }, [progress]);

    return (
        <>
            {loading ? (
                <LoadingScreen progress={progress} />
            ) : (
                // main app container
                <div className="w-screen h-screen overflow-hidden">
                    {/* 2 components container */}
                    <div>
                        <div>
                            <ContactList />
                        </div>
                        <div>
                            <Conversation />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default WhatsApp;