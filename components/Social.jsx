import Link from "next/link";
import { FaGithub, FaInstagram, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";

const Socials = [
    {
        icon: <FaGithub />,
        link: "https://www.github.com/adityashibu"
    },
    {
        icon: <FaInstagram />,
        link: "https://www.instagram.com/adwii.iii"
    },
    {
        icon: <FaWhatsapp />,
        link: "https://wa.me/971543547825"
    },
    {
        icon: <FaLinkedin />,
        link: "https://www.linkedin.com/in/adityashibu"
    },
    {
        icon: <PiMicrosoftOutlookLogoFill />,
        link: "mailto:adityashibuonline@gmail.com"
    },
]

const Social = ({ containerStyles, iconStyles }) => {
    return (
        <div className={containerStyles}>
            {Socials.map((social, index) => {
                return <Link key={index} href={social.link} className={iconStyles}>{social.icon}</Link>
            })}
        </div>
    )
}

export default Social