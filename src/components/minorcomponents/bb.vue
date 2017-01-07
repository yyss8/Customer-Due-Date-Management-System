<template>
    <div class='input-group-btn'>


        <div class="dropdown">
            <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{schType}}
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu">
                <li><a @click="selectType('ID')" href='javascript:void(0)'><i class="fa fa-users fa-fw" aria-hidden="true"></i>&nbsp; ID</a></li>
                <li><a @click="selectType('Event')" href='javascript:void(0)'><i class="fa fa-envelope fa-fw" aria-hidden="true"></i>&nbsp; E-mail</a></li>
                <li><a @click="selectType('Name')" href='javascript:void(0)'><i class="fa fa-vcard fa-fw" aria-hidden="true"></i>&nbsp; Name</a></li>
                <li><a @click="selectType('E-mail')" href='javascript:void(0)'><i class="fa fa-building fa-fw" aria-hidden="true"></i>&nbsp; Address</a></li>
            </ul>
        </div>
    </div>
</template>