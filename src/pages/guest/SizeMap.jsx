import React from 'react';
import { useNavigate } from 'react-router-dom';

const SizeMap = () => {
    const navigate = useNavigate();

    return (
        <div className='custom-padding flex flex-col gap-10'>
            <div className='bg-gray-100 p-2 mb-4 -mt-3 flex gap-2 items-center'>
                <a href='/' className='text-base font-medium text-blue-500 cursor-pointer'>
                    Trang chủ
                </a>
                <div>/</div>
                <div className='text-base font-medium text-black'>
                    Bảng thông số chọn quần áo
                </div>
            </div>
            <div className="content_main">
                <h1 className="text-4xl font-bold mb-6 text-center text-sapphire">Các bảng thông số chọn quần áo</h1>

                <p><em>Đơn vị: Cân nặng: kg ; Kích thước: cm</em></p>

                <h2 id="bang-thong-so-size-quan-ao-nam-chung">Bảng thông số size quần áo nam chung</h2>
                <div className="table-responsive">
                    <table className="table table-bordered" >
                        <tbody>
                            <tr>
                                <td><strong>Size</strong></td>
                                <td><strong>M</strong></td>
                                <td><strong>L</strong></td>
                                <td><strong>XL</strong></td>
                                <td><strong>XXL</strong></td>
                            </tr>
                            <tr>
                                <td>Chiều cao</td>
                                <td>165-167</td>
                                <td>168-170</td>
                                <td>170-173</td>
                                <td>173-176</td>
                            </tr>
                            <tr>
                                <td>Cân nặng</td>
                                <td>55-60 kg</td>
                                <td>60-65 kg</td>
                                <td>66-70 kg</td>
                                <td>70-76 kg</td>
                            </tr>
                            <tr>
                                <td>Vòng ngực</td>
                                <td>86-90</td>
                                <td>90-94</td>
                                <td>94-98</td>
                                <td>98-102</td>
                            </tr>
                            <tr>
                                <td>Vòng eo</td>
                                <td>68-72</td>
                                <td>72-76</td>
                                <td>76-80</td>
                                <td>80-84</td>
                            </tr>
                            <tr>
                                <td>Vòng mông</td>
                                <td>88-92</td>
                                <td>92-96</td>
                                <td>96-100</td>
                                <td>100-104</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2 id="thong-so-size-ao-phong-ao-thun-–-ao-polo">Thông số size áo phông (áo thun) – Áo polo</h2>
                <div className="table-responsive">
                    <table className="table table-bordered" >
                        <tbody>
                            <tr>
                                <td><strong>STT</strong></td>
                                <td><strong>Vị trí đo</strong></td>
                                <td><strong>M</strong></td>
                                <td><strong>L</strong></td>
                                <td><strong>XL</strong></td>
                                <td><strong>XXL</strong></td>
                                <td><strong>Dung sai</strong></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Dài áo đỉnh vai</td>
                                <td>66</td>
                                <td>68</td>
                                <td>70</td>
                                <td>72</td>
                                <td>0.5</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Rộng vai</td>
                                <td>39,5</td>
                                <td>41</td>
                                <td>42,5</td>
                                <td>44</td>
                                <td>0,5</td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>Dài tay cộc</td>
                                <td>18</td>
                                <td>19</td>
                                <td>20</td>
                                <td>21</td>
                                <td>0,5</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2 id="bang-thong-so-chot-size-quan-kaki">Bảng thông số chốt size quần kaki</h2>
                <div className="table-responsive">
                    <table className="table table-bordered" >
                        <tbody>
                            <tr>
                                <td><strong>STT</strong></td>
                                <td><strong>Vị trí đo</strong></td>
                                <td><strong>SIZE 29</strong></td>
                                <td><strong>SIZE 30</strong></td>
                                <td><strong>SIZE 31</strong></td>
                                <td><strong>SIZE 32</strong></td>
                                <td><strong>SIZE 33</strong></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Rộng cạp( gập đôi đo dưới chân cạp)</td>
                                <td>37</td>
                                <td>39</td>
                                <td>41</td>
                                <td>43</td>
                                <td>45</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Dài quần (cả cạp)</td>
                                <td>94</td>
                                <td>96</td>
                                <td>98</td>
                                <td>100</td>
                                <td>102</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Rộng mông (size 29 dưới chân cạp 14cm +0.5)</td>
                                <td>44</td>
                                <td>46</td>
                                <td>48</td>
                                <td>50</td>
                                <td>52</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>Rộng đùi</td>
                                <td>27</td>
                                <td>28</td>
                                <td>29</td>
                                <td>30</td>
                                <td>31</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2 id="thong-so-size-ao-so-mi-nam">Thông số size áo sơ mi nam</h2>
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <td><strong>STT</strong></td>
                                <td><strong>Vị trí đo</strong></td>
                                <td><strong>S/38</strong></td>
                                <td><strong>M/39</strong></td>
                                <td><strong>L/40</strong></td>
                                <td><strong>XL/41</strong></td>
                                <td><strong>2XL/42</strong></td>
                                <td><strong>Dung sai</strong></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Dài áo</td>
                                <td colspan="2">69</td>
                                <td colspan="2">71</td>
                                <td>73</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Rộng vai</td>
                                <td>42</td>
                                <td>43.5</td>
                                <td>45</td>
                                <td>46.5</td>
                                <td>48</td>
                                <td>0.5</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>Rộng ngực</td>
                                <td>48</td>
                                <td>50</td>
                                <td>52</td>
                                <td>54</td>
                                <td>56</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>Rộng bụng</td>
                                <td>47</td>
                                <td>49</td>
                                <td>51</td>
                                <td>53</td>
                                <td>55</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>Dài tay ngắn</td>
                                <td>20.5</td>
                                <td>21</td>
                                <td>21.5</td>
                                <td>22</td>
                                <td>22.5</td>
                                <td>0.5</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2 id="bang-thong-so-chon-size-quan-jeans">Bảng thông số chọn size quần jeans</h2>
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <td><strong>STT</strong></td>
                                <td><strong>Vị trí đo</strong></td>
                                <td><strong>29</strong></td>
                                <td><strong>30</strong></td>
                                <td><strong>31</strong></td>
                                <td><strong>32</strong></td>
                                <td><strong>33</strong></td>
                                <td><strong>34</strong></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Rộng cạp</td>
                                <td>37</td>
                                <td>38</td>
                                <td>39</td>
                                <td>40</td>
                                <td>41</td>
                                <td>42</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Dài quần</td>
                                <td>102</td>
                                <td>103</td>
                                <td>104</td>
                                <td>105</td>
                                <td>106</td>
                                <td>107</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Rộng mông</td>
                                <td>45</td>
                                <td>46</td>
                                <td>47</td>
                                <td>48</td>
                                <td>49</td>
                                <td>50</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>Rộng ống</td>
                                <td>29</td>
                                <td>30</td>
                                <td>31</td>
                                <td>32</td>
                                <td>33</td>
                                <td>34</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2 id="thong-so-size-ao-khoac-nam">Thông số size áo khoác nam</h2>
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <td><strong>STT</strong></td>
                                <td><strong>Vị trí đo</strong></td>
                                <td><strong>M</strong></td>
                                <td><strong>L</strong></td>
                                <td><strong>XL</strong></td>
                                <td><strong>XXL</strong></td>
                                <td><strong>Dung sai</strong></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Dài áo</td>
                                <td>66</td>
                                <td>68</td>
                                <td>70</td>
                                <td>72</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Rộng vai</td>
                                <td>44</td>
                                <td>46</td>
                                <td>48</td>
                                <td>50</td>
                                <td>0.5</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>1/2 Rộng ngực</td>
                                <td>52</td>
                                <td>54</td>
                                <td>56</td>
                                <td>58</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>Dài tay</td>
                                <td>60</td>
                                <td>62</td>
                                <td>64</td>
                                <td>66</td>
                                <td>1</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        
    );
};

export default SizeMap;
