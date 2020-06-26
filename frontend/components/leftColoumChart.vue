<template>
    <div>
        <div id="leftColoumChart" style="padding: 3% 0% 3% 0%; higth:auto">
            <div class="leftColoumChart_1" style="width: 50%; float: left;  padding-right: 5%;">
            
                <div id="upper_line">
                    <hr style="float: left; width: 4px; height: 18px; margin: 1% 1% 1% 1%; padding: 0; background-color: #1a3675;"> 
                    <p>Импортын тайлан мэдээ (сараар)</p>
                </div>
                <div id="cart" style="width : 100%; height: auto;">
                <CommitChart/>
                </div>
                <h3>“Эрдэнэс-Тавантолгой” ХК-ийн Хувьцаа эзэмшигчдийн ээлжит хурал 2020 оны 04 дүгээр сарын 24-ний өдрийн 09:00 
                    цагт нээлтэй хуралдлаа. </h3>
            </div>

            <div class="leftColoumChart_2" style="width: 50%; float: left;  padding-left: 5%;">
            
                <div id="upper_line">
                    <hr style="float: left; width: 4px; height: 18px; margin: 1% 1% 1% 1%; padding: 0; background-color: #1a3675;"> 
                    <p>Импортын тайлан мэдээ (сараар)</p>
                </div>
                <div id="cart" style="width : 100%; height: auto;">
                        <div >
                        <PieChart/>
                        </div>
                </div>
                <h3>“Эрдэнэс-Тавантолгой” ХК-ийн Хувьцаа эзэмшигчдийн ээлжит хурал 2020 оны 04 дүгээр сарын 24-ний өдрийн 09:00 
                    цагт нээлтэй хуралдлаа. </h3>
            </div>
        </div>
    </div>
</template>
<script>
import PieChart from "~/components/PieChart.js";
import CommitChart from '~/components/CommitChart.js'
export default {
	components: {
		CommitChart,
		PieChart,
	}
};
</script>
<style>
#leftColoumChart {
/* overflow to handle inner floating block */
overflow: hidden;
}
.leftColoumChart_1 img{
width: 100%; height: auto;
float: left;}
.leftColoumChart_1 h3{
height: 63px;
font-family: SegoeUI;
font-size: 16px;
font-weight: bold;
font-stretch: normal;
font-style: normal;
line-height: 1.31;
letter-spacing: normal;
text-align: left;
color: #000000;
float: left;
}

.leftColoumChart_2 img{
float: right;   
width: 100%; height: auto;
}

.leftColoumChart_2 h3{
height: 63px;
font-family: SegoeUI;
font-size: 16px;
font-weight: bold;
font-stretch: normal;
font-style: normal;
line-height: 1.31;
letter-spacing: normal;
text-align: left;
color: #000000;
float: left;
}
#upper_line p{
margin: 1% 1% 1% 1%;
width: auto;
height: auto;
font-family: SegoeUI;
font-size: 18px;
font-weight: bold;
font-stretch: normal;
font-style: normal;
line-height: 1.33;
letter-spacing: normal;
text-align: left;
color: #000000;
}
</style>
