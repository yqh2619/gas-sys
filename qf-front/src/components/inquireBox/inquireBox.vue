<template>
	<div>
		<el-card class="box-card">
			<el-form
				:inline="true"
				:model="props.inquireInfo"
				class="demo-form-inline"
			>
				<el-form-item
					:label="item.label"
					v-for="item in props.inquireInfo"
					:key="item.name"
				>
					<el-input
						v-if="item.type === 'input'"
						v-model="item.value"
						:placeholder="item.label"
					/>
					<el-select
						v-else-if="item.type == 'select'"
						v-model="item.value"
						placeholder="Select"
					>
						<el-option
							v-for="data in item.options"
							:key="data.value"
							:label="data.label"
							:value="data.value"
						/>
					</el-select>
					<el-date-picker
						v-else-if="item.type == 'date'"
						v-model="item.value"
						type="datetime"
						placeholder="Select date and time"
						format="YYYY-MM-DD hh:mm:ss"
						value-format="YYYY-MM-DD hh:mm:ss"
					/>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="onSubmit">查询</el-button>
					<el-button type="primary" @click="onSubmit('reset')"
						>重置</el-button
					>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
