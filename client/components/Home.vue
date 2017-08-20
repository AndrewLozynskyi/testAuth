<template>
    <div class="col-sm-6 col-sm-offset-3">
        <h1>This is home page</h1>
    </div>
    <button class="btn-menu" @click="closemenu()">Hide menu</button>
    <div class="content">
        <div class="side">
            <ul>
                <li>item 1</li>
                <li>item 2</li>
                <li>item 3</li>
            </ul>
        </div>
        
    </div>

</template>

<script>

export default {

    data() {
        return {
            quote: ''
        }
    },

    methods: {
        closemenu() {

            var btnMenu = document.getElementsByClassName('btn-menu')[0];

            var leftMenuStyle = document.getElementsByClassName('content')[0].style; 

            if(leftMenuStyle.display !== 'none') {

                leftMenuStyle.display = 'none';
                btnMenu.innerText = "Show Menu";

            } else {

                leftMenuStyle.display = 'block';
                btnMenu.innerText = "Hide Menu";
            }
        }
    }

}
</script>