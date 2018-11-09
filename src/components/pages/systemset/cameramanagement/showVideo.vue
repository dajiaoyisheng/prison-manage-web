<template>
    <div id="showVideo">
        <iframe style="height: 500px; width: 850px;" :src="'../ws_rtsp/rtspPlay.jsp?id=' + cameraId"></iframe>
    </div>
</template>

<script>
export default {
     props: [ 'cameraId' ]
}
</script>