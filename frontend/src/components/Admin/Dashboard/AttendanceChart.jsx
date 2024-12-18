import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, AreaChart, Area } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const data = [
    { date: "Monday", attendance: 100 },
    { date: "Tuesday", attendance: 60 },
    { date: "Wednesday", attendance: 180 },
    { date: "Thursday", attendance: 120 },
    { date: "Friday", attendance: 190 },
    { date: "Saturday", attendance: 210 },
    { date: "Sunday", attendance: 100 },
];

const chartConfig = {
    date: {
        date: "Date",
        color: "#EA5353",
    },
}

const AttendanceChart = () => {
    return (
        <div className='p-5 bg-white rounded-lg shadow-lg'>
            <div className='flex justify-between items-center'>
                <h2 className='text-sm font-medium text-foreground/80 mb-4'>Attendance</h2>
                <Select>
                    <SelectTrigger className="w-fit flex gap-3  h-fit">
                        <SelectValue placeholder="Last 7 days" className='py-0' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Last 7 days</SelectItem>
                        <SelectItem value="dark">Last 14 days</SelectItem>
                        <SelectItem value="system">Last 30 days</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full mt-5">
                <AreaChart data={data} >
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="date"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <YAxis
                        dataKey="attendance"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                        type="monotone"
                        dataKey="attendance"
                        stroke='var(--color-date)'
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        fill="var(--color-date)"
                        fillOpacity={0.1}
                    />
                </AreaChart>
            </ChartContainer>
        </div>
    )
}

export default AttendanceChart
