import React, { useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { getHeight } from 'rsuite/esm/DOMHelper';

const Dashboard = () => {
    const [selectedYear, setSelectedYear] = useState(2024);
    const [selectedMonth, setSelectedMonth] = useState(0);

    // Dữ liệu doanh thu và thống kê
    const dataByYear = {
        2021: {
            monthlyRevenue: [10000000, 12000000, 14000000, 13000000, 15000000, 16000000, 17000000, 18000000, 19000000, 20000000, 21000000, 22000000],
            bestSellingProducts: [300, 250, 270, 240, 210],
            potentialCustomers: [4, 3, 2, 5, 6, 8, 7, 6, 9, 2, 6, 6],
            orderStatisticsByMonth: [100, 120, 140, 130, 150, 160, 170, 180, 190, 200, 210, 220],
            weeklySalesDetail: {
                0: [2500000, 2000000, 3000000, 1500000],
                1: [3000000, 2500000, 2000000, 3000000],
                2: [2000000, 3000000, 2500000, 2000000],
                3: [2800000, 2600000, 2400000, 2200000],
                4: [2700000, 2200000, 3200000, 1700000],
                5: [3100000, 2600000, 3600000, 2100000],
                6: [2900000, 2400000, 3400000, 1900000],
                7: [3000000, 2700000, 2500000, 2200000],
                8: [3200000, 2800000, 2600000, 2400000],
                9: [3400000, 2900000, 2700000, 2600000],
                10: [3300000, 3000000, 2800000, 2700000],
                11: [3500000, 3200000, 3000000, 2900000]
            }
        },
        2022: {
            monthlyRevenue: [11000000, 13000000, 15000000, 14000000, 16000000, 17000000, 18000000, 19000000, 20000000, 21000000, 22000000, 23000000],
            bestSellingProducts: [320, 280, 260, 240, 220],
            potentialCustomers: [5, 4, 3, 6, 7, 5, 8, 6, 2, 3, 5, 4],
            orderStatisticsByMonth: [110, 130, 150, 140, 160, 170, 180, 190, 200, 210, 220, 230],
            weeklySalesDetail: {
                0: [2700000, 2200000, 3200000, 1700000],
                1: [3200000, 2700000, 2200000, 3200000],
                2: [2200000, 3200000, 2700000, 2200000],
                3: [3000000, 2800000, 2600000, 2400000],
                4: [3600000, 3100000, 2600000, 3600000],
                5: [3100000, 2600000, 3600000, 2100000],
                6: [3400000, 2900000, 2400000, 3400000],
                7: [3300000, 2800000, 3000000, 2500000],
                8: [3200000, 3000000, 2800000, 2700000],
                9: [3500000, 3200000, 3000000, 2900000],
                10: [3800000, 3400000, 3200000, 3100000],
                11: [3600000, 3300000, 3100000, 3300000]
            }
        },
        2023: {
            monthlyRevenue: [12000000, 14000000, 16000000, 15000000, 17000000, 18000000, 19000000, 20000000, 21000000, 22000000, 23000000, 24000000],
            bestSellingProducts: [340, 300, 280, 260, 230],
            potentialCustomers: [6, 5, 4, 7, 8, 10, 5, 9, 6, 3, 2, 8],
            orderStatisticsByMonth: [120, 140, 160, 150, 170, 180, 190, 200, 210, 220, 230, 240],
            weeklySalesDetail: {
                0: [2900000, 2400000, 3400000, 1900000],
                1: [3400000, 2900000, 2400000, 3400000],
                2: [2400000, 3400000, 2900000, 2400000],
                3: [3200000, 3000000, 2800000, 2600000],
                4: [3000000, 2700000, 3600000, 3100000],
                5: [3600000, 3100000, 3600000, 2100000],
                6: [3800000, 3400000, 3000000, 2900000],
                7: [3600000, 3300000, 3200000, 3100000],
                8: [3900000, 3600000, 3400000, 3300000],
                9: [4000000, 3800000, 3600000, 3500000],
                10: [3800000, 3600000, 3400000, 3200000],
                11: [4200000, 4000000, 3800000, 3600000]
            }
        },
        2024: {
            monthlyRevenue: [13000000, 15000000, 17000000, 16000000, 18000000, 19000000, 20000000],
            bestSellingProducts: [360, 320, 300, 280, 240],
            potentialCustomers: [7, 6, 5, 8, 9, 8, 5, 7, 9, 8, 6, 7],
            orderStatisticsByMonth: [130, 150, 170, 160, 180, 190, 200],
            weeklySalesDetail: {
                0: [3100000, 2600000, 3600000, 2100000],
                1: [3600000, 3100000, 2600000, 3600000],
                2: [2600000, 3600000, 3100000, 2600000],
                3: [3400000, 3000000, 2800000, 2600000],
                4: [3600000, 3200000, 3000000, 2800000],
                5: [4000000, 3500000, 3300000, 3100000],
                6: [4200000, 3800000, 3600000, 3300000]
            }
        }
    };

    // Biểu đồ doanh thu hàng tháng
    const monthlyRevenueData = {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        datasets: [
            {
                label: 'Doanh thu hàng tháng (triệu)',
                backgroundColor: 'rgba(75,192,192,0.6)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                data: dataByYear[selectedYear].monthlyRevenue.map(value => value / 1000000),
            },
        ],
    };

    // Biểu đồ sản phẩm bán chạy nhất
    const bestSellingProductsData = {
        labels: ['Áo phông nam', 'Áo khoác nỉ nữ', 'Quần tây nam', 'Áo sơ mi nam', 'Áo sơ mi nữ'],
        datasets: [
            {
                label: 'Sản phẩm bán chạy nhất',
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#2ECC71', '#D4AC0D'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#2ECC71', '#D4AC0D'],
                data: dataByYear[selectedYear].bestSellingProducts,
            },
        ],
    };

    // Biểu đồ khách hàng tiềm năng
    const potentialCustomersData = {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        datasets: [
            {
                label: 'Khách hàng tiềm năng',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: dataByYear[selectedYear].potentialCustomers,
            },
        ],
    };

    // Biểu đồ thống kê đơn hàng theo tháng
    const orderStatisticsByMonthData = {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        datasets: [
            {
                label: 'Thống kê đơn hàng theo tháng',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: dataByYear[selectedYear].orderStatisticsByMonth,
            },
        ],
    };

    // Biểu đồ doanh thu hàng tuần
    const weeklySalesDetailData = {
        labels: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'],
        datasets: [
            {
                label: 'Doanh thu hàng tuần (triệu)',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: selectedMonth !== null ? dataByYear[selectedYear].weeklySalesDetail[selectedMonth]?.map(value => value / 1000000) : [],
            },
        ],
    };
    

    const handleYearChange = (e) => {
        setSelectedYear(parseInt(e.target.value));
        setSelectedMonth(0);
    };

    const handleMonthClick = (monthIndex) => {
        setSelectedMonth(monthIndex);
    };

    return (
        <div className="container mx-auto custom-padding">
            <h1 className="text-2xl font-bold mt-4 mb-2">Bảng điều khiển</h1>
            <div className="my-4">
                <label className="font-semibold mr-2">Chọn năm:</label>
                <select value={selectedYear} onChange={handleYearChange} className="border rounded-md p-1">
                    {[2021, 2022, 2023, 2024].map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
            <div className='flex flex-col gap-5'>
                <div className='flex flex-col gap-5'>
                    <div className="p-4 bg-white shadow-md rounded-lg" >
                        <h2 className="text-lg font-semibold mb-4">Doanh thu hàng tháng</h2>
                        <Bar data={monthlyRevenueData} />
                    </div>
                    <div className="p-4 bg-white shadow-md rounded-lg">
                        <h2 className="text-lg font-semibold mb-4">Sản phẩm bán chạy nhất</h2>
                        <div className='flex items-center justify-center'>
                            <div className='w-fit max-h-[600px]'>
                                <Pie data={bestSellingProductsData} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white shadow-md rounded-lg">
                        <h2 className="text-lg font-semibold mb-4">Khách hàng tiềm năng</h2>
                        <Bar data={potentialCustomersData} />
                    </div>
                    <div className="p-4 bg-white shadow-md rounded-lg">
                        <h2 className="text-lg font-semibold mb-4">Thống kê đơn hàng theo tháng</h2>
                        <Line data={orderStatisticsByMonthData} />
                    </div>
                </div>
                <div className="p-4 bg-white shadow-md rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Doanh thu hàng tuần</h2>
                    <div className="flex justify-center gap-5 flex-wrap">
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((monthIndex) => (
                            <span
                                key={monthIndex}
                                className={`cursor-pointer inline-block rounded-full px-3 py-1 text-sm font-semibold ${selectedMonth === monthIndex ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                                    }`}
                                onClick={() => handleMonthClick(monthIndex)}
                            >
                                {`Tháng ${monthIndex + 1}`}
                            </span>
                        ))}
                    </div>
                    <Line data={weeklySalesDetailData} style={{ height: '300px' }} />
                </div>
            </div>
            
        </div>
    );
};

export default Dashboard;
