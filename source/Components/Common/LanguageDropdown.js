import { get, map } from "lodash";
import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

//i18n
import Image from 'next/image';
import languages from "../../common/languages";
import useLanguage from "../../i18n";


const LanguageDropdown = () => {
    // Declare a new state variable, which we'll call "menu"
    const [selectedLang, setSelectedLang] = useState("");
    const i18n = useLanguage();
    useEffect(() => {
        const currentLanguage = localStorage.getItem("I18N_LANGUAGE");
        setSelectedLang(currentLanguage);
    }, []);

    const changeLanguageAction = lang => {
        //set language as i18n
        i18n.changeLanguage(lang);
        localStorage.setItem("I18N_LANGUAGE", lang);
        setSelectedLang(lang);
    };


    const [isLanguageDropdown, setIsLanguageDropdown] = useState(false);
    const toggleLanguageDropdown = () => {
        setIsLanguageDropdown(!isLanguageDropdown);
    };
    return (
        <React.Fragment>
            <Dropdown isOpen={isLanguageDropdown} toggle={toggleLanguageDropdown} className="ms-1 topBar-head-dropdown header-item">
                <DropdownToggle className="btn btn-icon btn-topBar btn-ghost-secondary rounded-circle" tag="button">
                    <Image
                        src={get(languages, `${selectedLang}.flag`)}
                        alt="Header Language"
                        height="20"
                        className="rounded"
                    />
                </DropdownToggle>
                <DropdownMenu className="notify-item language py-2">
                    {map(Object.keys(languages), key => (
                        <DropdownItem
                            key={key}
                            onClick={() => changeLanguageAction(key)}
                            className={`notify-item ${selectedLang === key ? "active" : "none"
                                }`}
                        >
                            <Image
                                src={get(languages, `${key}.flag`)}
                                alt="Skote"
                                className="me-2 rounded"
                                height="18"
                            />
                            <span className="align-middle">
                                {get(languages, `${key}.label`)}
                            </span>
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    );
};

export default LanguageDropdown;