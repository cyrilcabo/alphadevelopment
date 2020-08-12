//AWS
import AWS from 'aws-sdk';

//Utils
import React from 'react';

const Test = ():JSX.Element => {
	const BUCKET_NAME:string = "alphadevelopment";
	
	const s3:any = new AWS.S3({
		apiVersion: '2006-03-01',
		params: {Bucket: BUCKET_NAME}
	});

	const listAlbum = ():any => {
		s3.listObjects({Delimiter: '/'}, (err:any, data:any):any => {
			if (err) {
				console.log('something went wrong', err.message);
				return;
			}
			const album = data.CommonPrefixes.map((commonPrefix:any):any => {
				const prefix = commonPrefix.Prefix;
				const albumName = decodeURIComponent(prefix.replace('/', ''));
				viewAlbum(albumName);
			});
		})
	}

	const viewAlbum = (albumName: string):any => {
		const albumKey:any = encodeURIComponent(albumName) + '/';

		s3.listObjects({Prefix: albumKey}, function (this: any, err: any, data:any):any {
			if (err) {
				console.log('something went wrong', err.message);
				return;
			}

			console.log('initial test', data);

			const href = this.request.httpRequest.endpoint.href;
			const bucketUrl = href + BUCKET_NAME + '/';

			const photos = data.Contents.filter((item:string, index:number) => index !== 0).map((photo: any) => {
				const photoKey = photo.Key;
				const url = bucketUrl + encodeURIComponent(photoKey);
				return url;
			});
			setArr(photos);
		});
	}
	
	React.useEffect(() => {
		listAlbum();
	}, []);

	const [arr, setArr]: [string[], Function] = React.useState([]);

	const links:JSX.Element[] = arr.map((item, key) => {
		return <li key={key}>
			<a href={item}> Link {key} </a>
		</li>
	});

	return (
		<div>
			<h1> Hello world </h1>
			<ul>
				{links}
			</ul>
		</div>
	);
}

export default Test;