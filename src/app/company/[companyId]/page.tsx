"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useAlert } from "@/components/alert/Context";
import Spinner from "@/components/loading/spinner";
import { getCompany } from "@/utils/getStuff";
import { Company } from "@/mock_data/mocks";


interface BookedResponse {
  message: string;
}

async function submitBooking(bookTime: Date, companyId: string): Promise<Response> {
  const booking = await fetch(`/api/booking`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      companyId: companyId,
      bookTime: bookTime,
    }),
  });
  return booking as Response;
}

export default function Home({ params }: { params: { companyId: string } }) {
  const alert = useAlert();
  const [company, setCompany] = useState<Company | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  }

  useEffect(() => {
    const fetchData = async () => {
      const a_company = await getCompany(params.companyId);
      setCompany(a_company ?? null);
      console.log(
        "a fucnklign company",
        a_company,
      );
    };
    fetchData();
  }, []);

  return (
    <div className="text-black bg-white h-[100vh]">
      <div className="py-[40px]"></div>
      {
        company ? (
          <div className="border-2 border-gray-300 rounded-2xl w-[70%] mx-auto">

            <div className="flex lg:justify-around mx-auto p-5 py-[50px] justify-center  flex-wrap lg:flex-nowrap">
              <div className="me-[60px]">
                <div className="mb-2">
                  <Link href={'/explore'} className="mb-[20px] text-[20px]">
                    <FontAwesomeIcon icon={faArrowLeftLong} className="fas fa-check" style={{ color: "black" }}
                    ></FontAwesomeIcon> ย้อนกลับ
                  </Link>
                </div>
                <img className="rounded" src={company?.image} alt="company image" width={600} height={800} />
              </div>

              <div>
                <div className="my-4 font-semibold text-3xl">{company?.name}</div>
                <div>
                  <div className="mt-2 font-semibold">รายละเอียดบริษัท</div>
                  <div className="font-medium text-[18px] w-[200px]">{company?.description}</div>
                </div>
                <div>
                  <div className="font-semibold mt-4">วันที่ต้องการจอง</div>
                  <div>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date: any) => setSelectedDate(date)}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="MMMM d, yyyy h:mm aa"
                      timeCaption="Time"
                      className="border-2 border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <button className="mt-5 flex items-center justify-center bg-primary text-white px-[1rem] text-[18px] rounded-[10px] h-[55px] border-2 border-transparent hover:bg-cutoff-white hover:border-primary hover:text-primary flex-none" onClick={async () => {
                  if (selectedDate) {
                    const result = await submitBooking(selectedDate, company.id);
                    const msg = await result.json() as BookedResponse;
                    if (!result.ok) {
                      alert.showAlert({
                        message: `ไม่สามารถจองได้ ${msg.message}`, mode: 'error'
                      });
                    }
                    else {
                      alert.showAlert({ message: 'จองสำเร็จ', mode: 'success' });
                    }
                  }
                }
                }>
                  ยืนยันการจอง
                </button>
              </div>
            </div>
          </div>

        ) : (
          // spinner
          <Spinner />
        )
      }
    </div >
  );
}
