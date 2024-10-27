import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const Job = ({ job }) => {
  useGetAppliedJobs();
  const navigate = useNavigate();
  const { allAppliedJobs } = useSelector((store) => store.job);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    // Cek apakah job ID ada di allAppliedJobs
    const applied = allAppliedJobs.some(
      (appliedJob) => appliedJob.job?._id === job?._id
    );
    console.log("isApplied status:", applied);
    setIsApplied(applied);
  }, [allAppliedJobs, job]);

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  // Fungsi untuk mengformat angka menjadi mata uang Rupiah
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0, // tidak ada desimal
      maximumFractionDigits: 0, // tidak ada desimal
    }).format(amount);
  };

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
          {formatCurrency(job?.salary)}{" "}
          {/* Gunakan fungsi formatCurrency di sini */}
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
        >
          Details
        </Button>
        <Button
          className={isApplied ? "bg-gray-400" : "bg-[#7209b7]"}
          disabled={isApplied}
        >
          {isApplied ? "Sudah Dilamar" : "Save For Later"}
        </Button>
      </div>
    </div>
  );
};

export default Job;
