import {graphql} from 'gatsby';
import {CardImageType} from '../components/qard/image';
import {AuthorType} from './author';
import {PageHeroType, PageMetaType} from './common';
import {CategoryType} from './category';

export interface PostType {
	id: string;
	md: string;
	html: string;

	frontmatter: {
		isPage: boolean;
		isFeatured: boolean;
		doFollowLinks?: boolean;
		showAuthor: boolean;
		title: string;
		excerpt: string;
		created_at: string;
		tags: string[];
		hero: PageHeroType;
		meta: PageMetaType;
	}

	parent: {
		modifiedTime: string;
	}

	references?: PostType[];
	authors: AuthorType[];
	categories: CategoryType[];

	fields: {
		slug: string;

		audios: {
			url: string;
			title: string;
			subtitle?: string;
			poster?: {
				image: CardImageType;
			}
		}[];

		galleries: {
			alt: string;
			image: {
				fileName: string;
				image: CardImageType;
			};
		}[];

		images: {
			alt: string;
			image: {
				fileName: string;
				image: CardImageType;
			};
		}[];
	}
}

export const _ = graphql`
	fragment postFragment on MarkdownRemark {
		id
		md: rawMarkdownBody
		html
		
		authors {
			...authorFragment
		}
		
		categories {
			...categoryFragment
		}
		
		parent {
			... on File {
				modifiedTime(formatString: "MMMM DD, YYYY")
			}
        }

		frontmatter{
			title
			excerpt
			created_at(formatString: "MMMM DD, YYYY")
			tags
			showAuthor
			doFollowLinks
			isPage
			isFeatured
			
			meta{
				keywords
				description
			}
			
			hero{
				alt
				image {
					sharp: childImageSharp {
						fluid(maxWidth: 2500) {
							tracedSVG
							aspectRatio
							originalImg
							src
							srcSet
							sizes
						}
						
						fixed(width:900){
							src
							width
							height
						}
					}
					
					thumb: childImageSharp {
						fluid(maxWidth:450){
							tracedSVG
							aspectRatio
							originalImg
							src
							srcSet
							sizes
						}
					}
				}
			}
		}
		
		references {
			id
			
			fields {
				slug
			}

			frontmatter{
				title
				excerpt
				created_at(formatString: "MMMM DD, YYYY")
				
				hero{
					alt
					image {
						thumb: childImageSharp {
							fluid(maxWidth:240){
								tracedSVG
								aspectRatio
								originalImg
								src
								srcSet
								sizes
							}
						}
					}
				}
			}
		}
		
		fields {
			slug

			audios: qardsAudio{
				url
				title
				subtitle
				poster: src {
					image: childImageSharp{
						fixed(width: 120){
							width
							height
							tracedSVG
							aspectRatio
							src
							srcSet
						}
					}
				}
			}
			
			galleries: qardsGallery{
				alt
				image: src {
					fileName: name
					image: childImageSharp{
						fluid(maxWidth: 2900) {
							tracedSVG
							aspectRatio
							originalImg
							src
							srcSet
							sizes
						}
					}
				}
			}
			
			images: image {
				alt
				image: src {
					fileName: name
					image: childImageSharp{
						fluid(maxWidth: 2900) {
							tracedSVG
							aspectRatio
							originalImg
							src
							srcSet
							sizes
						}
					}
				}
			}
		}
	}
	
	
	fragment cardPostFragment on MarkdownRemark {
		id
		md: rawMarkdownBody
		
		authors {
			...authorFragment
		}
		
		categories {
			id
			frontmatter {
				title
			}
		}
		
		frontmatter{
			title
			excerpt
			created_at(formatString: "MMMM DD, YYYY")
			
			hero{
				alt
				image {
					thumb: childImageSharp {
						fluid(maxWidth:450){
							tracedSVG
							aspectRatio
							originalImg
							src
							srcSet
							sizes
						}
					}
				}
			}
		}
		
		fields {
			slug
		}
	}
`;
