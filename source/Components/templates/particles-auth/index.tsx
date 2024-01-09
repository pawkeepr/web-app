'use client';

import React from 'react';

type ParticlesAuthProps = {
    children: React.ReactNode;
};

const ParticlesAuth = ({ children }: ParticlesAuthProps) => {
    return (
        <div className="!bg-primary-500">
            <div className="g-0">
                <div
                    className="auth-one-bg-position auth-one-bg h-full shadow-2xl"
                    id="auth-particles"
                >
                    <div className="bg-overlay"></div>
                </div>

                {children}
                {/* pass the children */}

                {/* <FooterAuth /> */}
            </div>
        </div>
    );
};

export default ParticlesAuth;
