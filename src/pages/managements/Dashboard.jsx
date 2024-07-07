import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {
    // Dữ liệu giả
    const monthlyRevenueData = {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
        datasets: [
            {
                label: 'Doanh thu hàng tháng',
                backgroundColor: 'rgba(75,192,192,0.6)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                data: [12000, 15000, 18000, 16000, 20000, 23000],
            },
        ],
    };

    const bestSellingProductsData = {
        labels: ['Áo khoác nỉ nam', 'Đầm dạ hội nữ', 'Túi xách da thật', 'Quần jean nam', 'Giày thể thao nữ'],
        datasets: [
            {
                label: 'Sản phẩm bán chạy nhất',
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
                data: [350, 300, 280, 250, 200],
            },
        ],
    };

    const potentialCustomersData = {
        labels: ['Nguyễn Thị Hằng', 'Trần Văn Bình', 'Phạm Thị Mai', 'Lê Minh Tuấn', 'Nguyễn Văn An'],
        datasets: [
            {
                label: 'Khách hàng tiềm năng',
                backgroundColor: 'rgba(255, 159, 64, 0.6)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
                data: [5, 4, 3, 6, 7],
            },
        ],
    };

    const orderStatisticsByMonthData = {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
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
                data: [120, 150, 180, 160, 200, 230],
            },
        ],
    };

    return (
        <div className='py-5 md:px-10 px-5'>
            <div className="dashboard-container">
                <div className='flex flex-col gap-10'>
                    <div className='bg-gray-100 p-2 flex gap-2 items-center'>
                        <a href='/' className='text-base font-medium text-blue-500 cursor-pointer'>
                            Dashboard
                        </a>
                    </div>
                    <div className='grid md:grid-cols-2 grid-cols-1 gap-10'>
                        <div className="chart-container bg-white rounded-lg shadow-lg p-5">
                            <h2>Doanh thu hàng tháng</h2>
                            <div style={{ height: '300px' }}>
                                <Bar
                                    data={monthlyRevenueData}
                                    options={{
                                        maintainAspectRatio: false,
                                        scales: {
                                            yAxes: [{
                                                ticks: {
                                                    beginAtZero: true,
                                                },
                                            }],
                                        },
                                    }}
                                />
                            </div>
                        </div>

                        <div className="chart-container bg-white rounded-lg shadow-lg p-5">
                            <h2>Sản phẩm bán chạy nhất</h2>
                            <div style={{ height: '300px' }}>
                                <Pie
                                    data={bestSellingProductsData}
                                    options={{
                                        maintainAspectRatio: false,
                                    }}
                                />
                            </div>
                        </div>

                        <div className="chart-container bg-white rounded-lg shadow-lg p-5">
                            <h2>Khách hàng tiềm năng</h2>
                            <div style={{ height: '300px' }}>
                                <Bar
                                    data={potentialCustomersData}
                                    options={{
                                        maintainAspectRatio: false,
                                        scales: {
                                            yAxes: [{
                                                ticks: {
                                                    beginAtZero: true,
                                                },
                                            }],
                                        },
                                    }}
                                />
                            </div>
                        </div>

                        <div className="chart-container bg-white rounded-lg shadow-lg p-5">
                            <h2>Thống kê đơn hàng theo tháng</h2>
                            <div style={{ height: '300px' }}>
                                <Line
                                    data={orderStatisticsByMonthData}
                                    options={{
                                        maintainAspectRatio: false,
                                        scales: {
                                            yAxes: [{
                                                ticks: {
                                                    beginAtZero: true,
                                                },
                                            }],
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
