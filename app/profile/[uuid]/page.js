import Image from "next/image";
import BotttomSheet from "../../component/bottomsheet";
import Link from "next/link";
import SaveContact from "@/app/client-component/save-contact";

export const metadata = {
    title: "Lynks App",
    description: ""
}
async function getData(uuid) {
    const requestOptions = {
        method: 'POST', // Specify the method
        headers: {
            'Content-Type': 'application/json', // Set the content type header
        },
        body: JSON.stringify({ uuid: uuid }), // Convert the UUID to a JSON string
    };

    // Make the POST request
    const res = await fetch('https://dev-lynkapp.shrewdbs.com/api/web/profile', requestOptions);

    return res.json()
}
export default async function Home({ params }) {
    const { data, error } = await getData(params.uuid)
    return (
        <main className="xl:flex lg:flex md:flex sm:flex justify-center w-full bg-gray-100">
            <div className="xl:w-[480px] lg:w-[480px] md:w-[480px] sm:w-[480px] bg-white shadow-white sm:shadow-md md:shadow-md xl:shadow-md lg:shadow-md">
                <div className="flex items-center justify-between w-full p-5 ">
                    <Image src={'/images/logo.png'} width={100} height={100} alt="logo" />
                    <div className="flex flex-col gap-2">
                        <Link className="active:opacity-50 select-none" href={'https://apps.apple.com/in/app/lynksapp/id6477260859'} target="_blank">
                            <Image src={'/images/svg/apple-download.svg'} draggable={false} width={150} height={150} alt="apple-download" />
                        </Link>
                        <Link className="active:opacity-50 select-none" href={'https://play.google.com/store/apps/details?id=com.shrewd.lynksapp'} target="_blank">
                            <Image src={'/images/svg/android-download.svg'} draggable={false} width={150} height={150} alt="android-download" />
                        </Link>
                    </div>
                </div>
                <div style={{ backgroundColor: data?.account_settings?.cardBgColor || '#48BB78' }} className="p-5 h-[170px] relative flex justify-center items-end">

                    <div style={{
                        backgroundImage: `url("${data?.profile?.profilePicture}")`,
                        backgroundSize: 'cover', // Ensure the image covers the div
                        backgroundPosition: 'center', // Center the image
                    }} className="absolute w-[110px] h-[110px] border-black border-[4px] rounded-full -bottom-1/3 ">
                        <div className="w-full h-full relative">
                            <Image className="absolute -bottom-1 -right-1 bg-white rounded-full" src={'/images/svg/tick.svg'} width={35} height={35} alt="android-download" />
                        </div>

                    </div>
                </div>
                <div className="flex flex-col items-center gap-2 p-5 mt-12">
                    <h3 className="text-2xl text-black font-bold">{data?.profile?.username}</h3>
                    <p className="text-md">{data?.profile?.jobTitle}</p>
                    <p className="text-sm">{data?.profile?.companyName}</p>
                    <p className="text-center text-xs">{data?.profile?.description}</p>
                </div>
                <div className="flex p-5 justify-between items-center gap-5">
                    <SaveContact uuid={params.uuid} />
                    <div className="flex justify-between gap-5">
                        <Link href={`tel:${data?.profile?.mobileNo}`}>
                            <div className="p-3 bg-gray-300 object-cover rounded-full aspect-square flex justify-center items-center active:opacity-50">
                                <Image className=" " src={'/images/svg/call.svg'} width={30} height={30} alt="call" />
                            </div>
                        </Link>
                        <Link href={`mailto:${data?.profile?.emailId}`}>
                            <div className="p-3 bg-gray-300 object-cover rounded-full aspect-square flex justify-center items-center active:opacity-50">
                                <Image className=" " src={'/images/svg/mail.svg'} width={30} height={30} alt="call" />
                            </div>
                        </Link>
                    </div>

                </div>

                <div className="p-5">
                    <h3 className="font-bold py-5 text-center text-2xl text-[#14437A]">Connect Via</h3>
                    <div className="grid grid-cols-3 gap-x-20 gap-y-10">
                        {data?.profile?.socialMediaData.map((socialMediaItem, index) => (
                            <Link key={index} href={socialMediaItem?.link === null ? '#' : socialMediaItem?.link} target={socialMediaItem?.link === null ? '' : '_blank'}>
                            <div  className="flex justify-center items-center">
                                <Image src={socialMediaItem.icon} width={70} height={70} alt="" />
                            </div>
                            </Link>
                        ))}

                    </div>
                </div>

                {/* <div className="p-5">
                    <div className=" bg-[#DCE3EB]/25 py-10 rounded-[30px] flex sm:gap-10 lg:gap-10 xl:gap-10 md:gap-10 justify-between sm:justify-center md:justify-center lg:justify-center xl:justify-center px-5 sm:px-0 lg:px-0 md:px-0 xl:px-0 items-center active:opacity-50  cursor-pointer ">
                        <Image className=" " src={'/images/svg/calendar.svg'} width={30} height={30} alt="call" />
                        <h4 className="capitalize text-[#14437A] font-medium">shedual meeting</h4>
                        <Image className=" " src={'/images/svg/right-arrow.svg'} width={30} height={30} alt="call" />

                    </div>
                </div> */}
                {data?.profile?.companyProfile && (
                    <Link href={data?.profile?.companyProfile} download>
                        <div className="p-5">
                            <div className=" bg-[#DCE3EB]/25 py-8 rounded-[30px] flex justify-center active:opacity-50  cursor-pointer ">
                                <div className="flex flex-col justify-center items-center">
                                    <Image className=" " src={'/images/svg/pdf.svg'} width={30} height={30} alt="call" />
                                    <h4 className="capitalize text-[#14437A] font-medium">document</h4>
                                </div>
                            </div>
                        </div>
                    </Link>
                )}

            </div>
            <BotttomSheet flag={error ? true : false} message={error ? error.message : ''} />
        </main>
    );
}
