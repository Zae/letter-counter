<template>
	<div class="container">
		<div class="row">
			<div class="col-md-6">
				<div class="row">
					<div class="col-md-12">
						<h2>Vowels:</h2> <span class="vowels" v-text="vowels"></span>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<h3>Top3:</h3>
						<ul class="vowelstop3 list-unstyled" v-for="vowel in vowelsTop3">
							<li>{{ vowel.letter }}: {{ vowel.occurrences }}</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="row">
					<div class="col-md-12">
						<h2>Consonants: </h2><span class="consonants" v-text="consonants"></span>
					</div>
				</div>

				<div class="row">
					<div class="col-md-12">
						<h3>Top3:</h3>
						<ul class="consonantstop3 list-unstyled" v-for="consonant in consonantsTop3">
							<li>{{ consonant.letter }}: {{ consonant.occurrences }}</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<textarea name="text" class="form-control" v-model="input"></textarea>
			</div>
		</div>
	</div>
</template>

<script>
	import letterCounter from '../modules/lettercounter';

	export default {
		data() {
			return {
				input: ''
			};
		},
		computed: {
			vowels() {
				return letterCounter(this.input).vowels();
			},
			consonants() {
				return letterCounter(this.input).consonants();
			},
			vowelsTop3() {
				return letterCounter(this.input).vowelsTop3();
			},
			consonantsTop3() {
				return letterCounter(this.input).consonantsTop3();
			}
		}
	}
</script>