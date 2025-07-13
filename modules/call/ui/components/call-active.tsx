import Link from "next/link";
import Image from "next/image";

import { CallControls, SpeakerLayout } from "@stream-io/video-react-sdk";

interface Props {
    onLeave: () => void
    meetingName: string
}

export const CallActive = ({onLeave, meetingName} : Props) => {


    return (
        <div className="flex flex-col justify-between h-full p-4 text-white">
            <div className="bg-[#101213] rounded-full p-4 flex items-center gap-4">
                <Link href='/dashboard' className="flex items-center justify-center p-1 bg-white/10 rounded-full w-fit">
                    <Image src='.logo.svg' alt="Meet.AI"/>
                </Link>
                <h4>{meetingName}</h4>
            </div>
            <SpeakerLayout/>
            <div className="bg-[#101213] rounded-full px-4">
                <CallControls onLeave={onLeave}/>
            </div>
        </div>
    )
}