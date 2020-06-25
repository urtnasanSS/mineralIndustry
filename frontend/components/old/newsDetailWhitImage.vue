<template>
  <div class="newsOuter">
    <breadcrumb />
    <i class="fa fa-print" />
    <h4 class="title is-5 headerTitle">
      Ломбард хэмээх барьцаалан зээлдүүлэх газрын дүрмийг хянан хэлэлцсэн тухай хянан хэлэлцсэн тухай хэлэлцсэн тухай хэлэлцсэн тухай хэлэлцсэн тухай
    </h4>
    <p class="subtitle is-6">
      <i class="fas fa-eye" /> 125
      <i class="fas fa-clock" style="margin-left:10px;" />
      2019-9-10
    </p>
    <div class="detailImage">
      <!-- <img src="/img/test3.jpg" alt="Placeholder image" /> -->
      <div class="column is-12">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="/img/test3.jpg" alt="Placeholder image">
          </figure>
        </div>
      </div>
    </div>
    <div class="picturedetail">
      <p class="subtitle is-5 picture-about" style="float: left; position: absolute;">
        Файлын нэр: Аудио бичлэг
      </p>
      <p class="subtitle is-5 picture-about" style="float: right">
        Файлын хэмжээ: 128kb
      </p>
    </div>
    <div class="column is-12">
      <div class="audio">
        <i class=" fa fa-play" />
        <i class="auidoText">Ломбард хэмжээх барьцаалан зээлдүүлэх газрын дүрмийг хянан хэлэлцсэн</i>
      </div>
    </div>
    <p class="text">
      Архивын ерөнхий газарт “газар-улсын үндэс” сэдэвт газрын зураг, газрын нэршилийн баримтын үзэсгэлэн нээлтээ хийлээ.<br><br>Монгол Улсын Шинжлэх Ухааны Академийн Түүх, археологийн
      хүрээлэн, Олон улсын монгол судлалын холбоо, Монгол газар
      нутгийн нэрийн судлалын холбоо, Япон улсын Токиогийн Гадаад
      судлалын их сургууль, Архивын ерөнхий газар хамтран 2017 оны 8
      дугаар сарын 24-25-ны өдрүүдэд зохион байгуулж байгаа “Монголын
      газрын зураг, газрын нэр судлал” сэдэвт олон улсын эрдэм
      шинжилгээний хуралд зориулан Архивын ерөнхий газраас “
    </p>
    <div class="images">
      <h2 class="title is-6" style="margin-bottom: 0.5rem;">
        Зургууд:
      </h2>
      <div class="columns">
        <div class="column">
          <div class="columns">
            <div class="column is-3">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img src="/img/test2.jpg" alt="Placeholder image">
                </figure>
              </div>
            </div>
            <div class="column is-3">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img src="/img/test2.jpg" alt="Placeholder image">
                </figure>
              </div>
            </div>
            <div class="column is-3">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img src="/img/test2.jpg" alt="Placeholder image">
                </figure>
              </div>
            </div>
            <div class="column is-3">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img src="/img/test2.jpg" alt="Placeholder image">
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <GroupTitle :name="'Холбоотой мэдээ'" style="margin-bottom: 15px" />
    <div class="columns">
      <div class="column">
        <div class="columns">
          <div class="column is-2">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="/img/test2.jpg" alt="Placeholder image">
              </figure>
            </div>
          </div>
          <div class="column is-4">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">
                  Архивын ерөнхий газарт “газар-улсын үндэс” сэдэвт газрын
                  зураг, газрын нэршилийн баримтын үзэсгэлэн нээлтээ хийлээ.
                </p>
                <p class="subtitle is-6">
                  <i class="fas fa-eye" /> 125
                  <i class="fas fa-clock" style="margin-left:10px;" />
                  2019-9-10
                </p>
              </div>
            </div>

            <div class="content">
              Монгол Улсын Шинжлэх Ухааны Академийн Түүх, археологийн
              хүрээлэн, Олон улсын монгол судлалын холбоо, Монгол газар
              нутгийн нэрийн судлалын холбоо, Япон улсын Токиогийн Гадаад
              судлалын их сургууль, Архивын ерөнхий газар хамтран 2017 оны 8
              дугаар сарын 24-25-ны өдрүүдэд зохион байгуулж байгаа “Монголын
              газрын зураг, газрын нэр судлал” сэдэвт олон улсын эрдэм
              шинжилгээний хуралд зориулан Архивын ерөнхий газраас “...
              <br>
            </div>
            <CustomButton type="big" />
          </div>
          <div class="column is-2">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="/img/test2.jpg" alt="Placeholder image">
              </figure>
            </div>
          </div>
          <div class="column is-4">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">
                  Архивын ерөнхий газарт “газар-улсын үндэс” сэдэвт газрын
                  зураг, газрын нэршилийн баримтын үзэсгэлэн нээлтээ хийлээ.
                </p>
                <p class="subtitle is-6">
                  <i class="fas fa-eye" /> 125
                  <i class="fas fa-clock" style="margin-left:10px;" />
                  2019-9-10
                </p>
              </div>
            </div>

            <div class="content">
              Монгол Улсын Шинжлэх Ухааны Академийн Түүх, археологийн
              хүрээлэн, Олон улсын монгол судлалын холбоо, Монгол газар
              нутгийн нэрийн судлалын холбоо, Япон улсын Токиогийн Гадаад
              судлалын их сургууль, Архивын ерөнхий газар хамтран 2017 оны 8
              дугаар сарын 24-25-ны өдрүүдэд зохион байгуулж байгаа “Монголын
              газрын зураг, газрын нэр судлал” сэдэвт олон улсын эрдэм
              шинжилгээний хуралд зориулан Архивын ерөнхий газраас “...
              <br>
            </div>
            <CustomButton type="big" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import GroupTitle from '~/components/custom/GroupTitle.vue'
export default {
  components: {
    GroupTitle
  }
}
</script>
<style lang="scss" scoped>
.newsOuter{
	.fa-print {
		float: right;
		padding-right: 20px;
	}
	.text {
		text-align: justify;
		padding: 10px;
	}
	.columns {
		.column {
			.title {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				font-size: 14px;
			}
			.subtitle {
				padding: 5px 0px;
				float: right;
				font-size: 11px;
				color: #909399;
			}
			.content {
				font-size: 12px;
				color: #909399;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
			}
		}
	}
	.images {
		padding: 10px 0 20px;
	}
	.detailImage {
		margin-top: -1.25rem;
	}
	.headerTitle {
		padding: 20px 10px 20px 0px;
		overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 18px;
		border-bottom: 1px solid black;
	}
	.subtitle {
		padding: 3px 10px;
		font-size: 12px;
		color: #909399;
	}
	.column {
		height: 50%;
	}
	.audio {
		border: 1px solid black;
		border-radius: 5px;
		.fa-play {
			color: blue;
			font-size: 18px;
			padding: 2px 10px 2px 25px;
			float: left;
		}
		.auidoText {
			font-size: 14px;
		}
	}
	.picturedetail {
		margin-bottom: 5px;
		.picture-about {
			font-size: 12px;
			color: #909399;
			padding: 2px 10px;
		}
	}
}
</style>
