import { useQuery } from "@tanstack/react-query";
import { ApiException, Fetcher } from "../../lib/fetcher";
import { Booking, User } from "../../@types";
import { user } from "../../utils/helpers";

const DashboardPage = () => {

  const { data: bookingsData } = useQuery<any, ApiException, { data: Booking[] }>({
    queryKey: ["Bookings"],
    queryFn: () => Fetcher.get(user.role === "user" ? "booking/mybookings" : "/booking/all"),
    retry: false,
  });
  const { data: eventsData } = useQuery<any, ApiException, { data: Event[] }>({
    queryKey: ["Events"],
    queryFn: () => Fetcher.get("/event/all"),
    retry: false,
  });
  const { data: usersData } = useQuery<any, ApiException, { data: User[] }>({
    queryKey: ["Users"],
    queryFn: () => Fetcher.get("/user/all"),
    retry: false,
  });
  //

  return (
    <div className="mt-1">

      {/* <DataWidget isLoading={isLoading} error={error} retry={refetch}> */}
      <div className="grid-cols-4 grid gap-5">
        {[
          { title: "Total Bookings", number: bookingsData?.data?.length, className: '' },
          { title: "Total Events", number: eventsData?.data?.length, className: '' },
          { title: "Total Users", number: usersData?.data?.length, className: '', hide: user.role === "user" }
        ].map((data, index) => {
          if (data.hide) {
            return <div key={index}></div>;
          }
          return <div key={index} className={"bg-white p-3 border-l-[3px] border-primary flex flex-col items-start " + data.className}>
            <p className="font-bold text-3xl text-primary">{data.number}+</p>
            <p className="text-sm">{data.title}</p>
          </div>
        })}
      </div>
      {/* </DataWidget> */}
    </div>
  );
}

export default DashboardPage;