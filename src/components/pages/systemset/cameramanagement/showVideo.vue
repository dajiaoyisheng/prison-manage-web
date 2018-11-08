<template>
    <div id="showVideo">
        <iframe style="height: 370px; width: 750px;" :src="'../ws_rtsp/rtspPlay.jsp?id=' + cameraId"></iframe>
    </div>
</template>

<script>
export default {
     props: [ 'cameraId' ]
}
</script>